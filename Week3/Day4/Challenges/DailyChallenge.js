//ch
//Html
// <!DOCTYPE html>
// <html>
//  <head>
//   <meta charset="utf-8" />
//   <title>Challenge: Mad Libs</title>
//  </head>
//  <body>

//     <h1>Mad Libs</h1>

//     <form id="libform">
//         <label for="noun">Noun:</label><input type="text" id="noun"><br>
//         <label for="adjective">Adjective:</label><input type="text" id="adjective"><br>
//         <label for="person">Someone's Name:</label><input type="text" id="person"><br>
//         <label for="verb">Verb:</label><input type="text" id="verb"><br>
//         <label for="place">A place:</label><input type="text" id="place"><br>
//         <button id="lib-button">Lib it!</button>
//     </form>

//     <p>Generated story: 
//     <span id="story"></span>
//     </p>

//     <script src="testRun.js"></script>

//  </body>
// </html>

//JS
// Grab form and elements
const form = document.getElementById("libform");
const storySpan = document.getElementById("story");
const shuffleBtn = document.getElementById("shuffle-button");

// Store last inputs globally to keep between shuffles
let lastInputs = null;

// Stories templates, with placeholders for values
const stories = [
  ({ noun, adjective, person, verb, place }) => 
    `${person} went to the ${place} to ${verb} a ${adjective} ${noun}. It was unforgettable!`,
  
  ({ noun, adjective, person, verb, place }) => 
    `One day, ${person} decided to ${verb} the ${adjective} ${noun} at the ${place}. What an adventure!`,
  
  ({ noun, adjective, person, verb, place }) => 
    `At the ${place}, ${person} saw a ${adjective} ${noun} that wanted to ${verb} with them.`,
  
  ({ noun, adjective, person, verb, place }) => 
    `Nobody believed that ${person} could ${verb} the ${adjective} ${noun} from the ${place}.`,
];

// Function to get input values and validate
function getInputValues() {
  const noun = document.getElementById("noun").value.trim();
  const adjective = document.getElementById("adjective").value.trim();
  const person = document.getElementById("person").value.trim();
  const verb = document.getElementById("verb").value.trim();
  const place = document.getElementById("place").value.trim();

  // Check none is empty
  if (!noun || !adjective || !person || !verb || !place) {
    alert("Please fill in all the fields!");
    return null;
  }

  return { noun, adjective, person, verb, place };
}

// Function to generate and display story
function generateStory(inputs) {
  // Pick a random story template
  const randomIndex = Math.floor(Math.random() * stories.length);
  const storyText = stories[randomIndex](inputs);
  storySpan.textContent = storyText;
}

// Handle form submit
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputs = getInputValues();
  if (!inputs) return;

  lastInputs = inputs; // Save inputs globally for shuffle

  generateStory(inputs);
});

// Handle shuffle button click (bonus)
shuffleBtn.addEventListener("click", () => {
  if (!lastInputs) {
    alert("Please submit the form first to generate a story!");
    return;
  }
  generateStory(lastInputs);
});


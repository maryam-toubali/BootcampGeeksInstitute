//Ex1:
//Html/Css:
// <!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8" />
// <title>Exercise 1: Change the article</title>
// <style>
//   .fade-out {
//     animation: fadeOut 2s forwards;
//   }
//   @keyframes fadeOut {
//     to {
//       opacity: 0;
//     }
//   }
// </style>
// </head>
// <body>

// <article>
//     <h1> Some Facts </h1>
//     <h2> The Chocolate </h2>
//     <h3> History of the chocolate </h3>
//     <p> Chocolate is made from tropical Theobroma cacao tree seeds. 
//     Its earliest use dates back to the Olmec civilization in Mesoamerica.</p>
//     <p> After the European discovery of the Americas, chocolate became 
//     very popular in the wider world, and its demand exploded. </p>
//     <p> Chocolate has since become a popular food product that millions enjoy every day, 
//     thanks to its unique, rich, and sweet taste.</p> 
//     <p> But what effect does eating chocolate have on our health?</p> 
// </article>

// <button id="boldBtn">Make paragraphs bold</button>

// <script src="testRun.js"></script>
// </body>
// </html>

//JS
// Retrieve the h1 and console.log it
const h1 = document.querySelector('article h1');
console.log(h1);

// Remove the last paragraph in the article
const article = document.querySelector('article');
const paragraphs = article.querySelectorAll('p');
const lastParagraph = paragraphs[paragraphs.length - 1];
article.removeChild(lastParagraph);

// Event listener to change background color of h2 to red on click
const h2 = document.querySelector('article h2');
h2.addEventListener('click', () => {
  h2.style.backgroundColor = 'red';
});

// Event listener to hide h3 on click (display:none)
const h3 = document.querySelector('article h3');
h3.addEventListener('click', () => {
  h3.style.display = 'none';
});

// Add event listener on button to make all paragraphs bold
const button = document.getElementById('boldBtn');
button.addEventListener('click', () => {
  const allParagraphs = document.querySelectorAll('article p');
  allParagraphs.forEach(p => {
    p.style.fontWeight = 'bold';
  });
});

// BONUS 1: On hover on h1, set font size to random between 0 and 100px
h1.addEventListener('mouseenter', () => {
  const randomSize = Math.floor(Math.random() * 101); // 0 to 100
  h1.style.fontSize = randomSize + 'px';
});

// BONUS 2: On hover on 2nd paragraph, fade it out
const secondParagraph = paragraphs[1]; // index 1 = second paragraph
secondParagraph.addEventListener('mouseenter', () => {
  secondParagraph.classList.add('fade-out');
});


//Ex2:
//Html
/* <form>
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="firstname"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lastname"><br><br>
  <input type="submit" value="Submit" id="submit">
</form> 
<ul class="usersAnswer"></ul> */

//JS
// Retrieve the form and console.log it
const form = document.querySelector("form");
console.log(form);

// Retrieve the inputs by their id and console.log them
const inputFname = document.getElementById("fname");
const inputLname = document.getElementById("lname");
console.log(inputFname, inputLname);

// Retrieve the inputs by their name attribute and console.log them
const inputByNameFirst = document.querySelector('input[name="firstname"]');
const inputByNameLast = document.querySelector('input[name="lastname"]');
console.log(inputByNameFirst, inputByNameLast);

// Add event listener on form submit
form.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent page reload on submit

  // Get values from inputs
  const firstName = inputFname.value.trim();
  const lastName = inputLname.value.trim();

  // Check if inputs are not empty
  if (firstName === "" || lastName === "") {
    alert("Please fill in both first name and last name.");
    return; // stop if empty
  }

  // Select the ul where we append li elements
  const ul = document.querySelector(".usersAnswer");
  
  // Clear previous answers
  ul.innerHTML = "";

  // Create li for first name
  const liFirst = document.createElement("li");
  liFirst.textContent = firstName;
  ul.appendChild(liFirst);

  // Create li for last name
  const liLast = document.createElement("li");
  liLast.textContent = lastName;
  ul.appendChild(liLast);

  // Optionally reset form inputs
  form.reset();
});


//Ex3:
//Html
/* <p>
  <strong>Hello</strong> I hope you are enjoying <strong>this</strong> class. At the
  <strong>end</strong> you <strong>will</strong> be great Developers!
  <strong>Enjoy</strong> the <strong>JavaScript </strong> lessons
</p> */

//JS
// Declare global variable to hold all <strong> elements
let allBoldItems;

// Function to get all bold items inside the paragraph and assign to allBoldItems
function getBoldItems() {
  allBoldItems = document.querySelectorAll("p strong");
}

// Function to highlight all bold items (set color to blue)
function highlight() {
  allBoldItems.forEach(item => {
    item.style.color = "blue";
  });
}

// Function to return bold items color to default (black)
function returnItemsToDefault() {
  allBoldItems.forEach(item => {
    item.style.color = "black";
  });
}

// Call getBoldItems to fill the variable first
getBoldItems();

// Select the paragraph
const paragraph = document.querySelector("p");

// Add event listeners for mouseover and mouseout
paragraph.addEventListener("mouseover", highlight);
paragraph.addEventListener("mouseout", returnItemsToDefault);


//Ex4:
//Html
// <!doctype html> 
// <html lang="en"> 
// <head> 
//     <meta charset="utf-8"> 
//     <title>Volume of a Sphere</title> 
//     <style>  
//         body {
//             padding-top:30px;
//         } 

//         label,input {
//             display:block;
//         }  
//     </style> 
// </head> 
// <body> 
//     <p>Input radius value and get the volume of a sphere.</p> 
//     <form  id="MyForm"> 
//         <label for="radius">Radius</label><input type="text" name="radius" id="radius" required> 
//         <label for="volume">Volume</label><input type="text" name="volume" id="volume"> 
//         <input type="submit" value="Calculate" id="submit">    
//     </form> 
// </body> 
// </html>

//JS
// Select the form
const form1 = document.getElementById("MyForm");

// Select the inputs
const radiusInput = document.getElementById("radius");
const volumeInput = document.getElementById("volume");

// Add submit event listener
form1.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent page reload

  // Get radius value and convert to number
  const radius = parseFloat(radiusInput.value);

  // Validate radius input
  if (isNaN(radius) || radius <= 0) {
    alert("Please enter a valid positive number for radius.");
    volumeInput.value = ""; // clear volume field
    return;
  }

  // Calculate volume of sphere: (4/3) * π * r³
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);

  // Set volume input value with 2 decimals
  volumeInput.value = volume.toFixed(2);
});






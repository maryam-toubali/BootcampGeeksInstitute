//Ex1:
// <!DOCTYPE html>
// <html>
// <head>
//     <style>
//     p {
//       background: yellow;
//       color: red;
//     }
//     </style>
// </head>
// <body>
//     <div id="container"></div>
//     <button id="clear">Clear Interval</button>
// </body>
// </html>

//JS
// Part I
// Using setTimeout, after 2 seconds alert "Hello World"
setTimeout(() => {
  alert("Hello World");
}, 2000);

// Part II
// Using setTimeout, after 2 seconds add <p>Hello World</p> to div#container
setTimeout(() => {
  const container = document.getElementById("container");
  const p = document.createElement("p");
  p.textContent = "Hello World";
  container.appendChild(p);
}, 2000);

// Part III
// Using setInterval, every 2 seconds add a new <p>Hello World</p> to div#container.
// Stop interval either when 5 paragraphs exist or button clicked.

const container = document.getElementById("container");
const clearButton = document.getElementById("clear");

const intervalId = setInterval(() => {
  const p = document.createElement("p");
  p.textContent = "Hello World";
  container.appendChild(p);

  // If 5 or more paragraphs, stop interval
  if (container.querySelectorAll("p").length >= 5) {
    clearInterval(intervalId);
  }
}, 2000);

// Clear interval on button click
clearButton.addEventListener("click", () => {
  clearInterval(intervalId);
});


//Ex2:
//Html
// <!DOCTYPE html>
// <html>
// <head>
//     <style>
//     #container {
//       width: 400px;
//       height: 400px;
//       position: relative;
//       background: yellow;
//     }
//     #animate {
//       width: 50px;
//       height: 50px;
//       position: absolute;
//       background-color: red;
//     }
//     </style>
// </head>
// <body>
//     <p><button onclick="myMove()">Click Me</button></p>
//     <div id="container">
//       <div id="animate"></div>
//     </div>
// </body>
// </html>


//JS
function myMove() {
  const elem = document.getElementById("animate");
  const container = document.getElementById("container");
  
  let pos = 0; // current position from left in px
  const maxPos = container.clientWidth - elem.clientWidth; // max move distance

  // Use setInterval to move 1px every 1 millisecond
  const id = setInterval(() => {
    if (pos >= maxPos) {
      clearInterval(id); // stop moving when reach the end
    } else {
      pos++;
      elem.style.left = pos + "px"; // move right by 1px
    }
  }, 1);
}




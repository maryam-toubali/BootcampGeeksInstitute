//Ex1:
// #1
// function funcOne() {
//     const a = 5;
//     if(a > 1) {
//         a = 3;
//     }
//     alert(`inside the funcOne function ${a}`);
// }

// // #1.1 - run in the console:
// funcOne()
// #1.2 What will happen if the variable is declared 
// with const instead of let ?  
// TypeError: Assignment to constant variable. (We can not change the value of a variable declared with const.)

//#2
// const a = 0;
// function funcTwo() {
//     a = 5;
// }

// function funcThree() {
//     alert(`inside the funcThree function ${a}`);
// }

// // #2.1 - run in the console:
// funcThree()
// funcTwo()
// funcThree()
// #2.2 What will happen if the variable is declared 
// with const instead of let ? 
// TypeError: Assignment to constant variable. (We can not change the value of a variable declared with const.)


//#3
// function funcFour() {
//     window.a = "hello";
// }

// function funcFive() {
//     alert(`inside the funcFive function ${a}`);
// }

// // #3.1 - run in the console:
// funcFour()
// funcFive()

//#4
// let a = 1;
// function funcSix() {
//     let a = "test";
//     alert(`inside the funcSix function ${a}`);
// }

// // #4.1 - run in the console:
// funcSix()
// // #4.2 What will happen if the variable is declared 
// // with const instead of let ? 
// // return exactly the same result as with let. (const also creates a new scope for the variable, so it will not affect the outer scope.)


//#5
let a = 2;
if (true) {
    const a = 5;
    alert(`in the if block ${a}`);
}
alert(`outside of the if block ${a}`);

// #5.1 - run the code in the console
// #5.2 What will happen if the variable is declared 
// with const instead of let ? 
// return exactly the same result as with let.


//Ex2:
// function winBattle(){
//     return true;
// }
const winBattle = () => true
let experiencePoints = winBattle() ?  10 : 1;
console.log(experiencePoints);


//Ex3:
const isString = arg => typeof arg === 'string'; //typeof arr === 'string' already evaluates to true or false
console.log(isString('hello')); 
console.log(isString([1, 2, 4, 0]));


//Ex4:
const sum = (a,b) => a+b;
//console.log(sum(3,4));


//Ex5:
//Function Declaration
function kgToGrams (weight) { return weight*1000 };
console.log(kgToGram(2));
//Function Expression
const kgToGrams = function (weight) { return weight*1000};
console.log(kgToGram(2));
// Function declarations are hoisted (can be called before they are defined); function expressions are not.
//One-line Arrow Function
const kgToGrams = weight => weight*1000; 
console.log(kgToGram(2));


//Ex6:
// Html
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Fortune Teller</title>
// </head>
// <body>
//   <div id="fortune"></div> <!-- Fortune will be displayed here -->
//   <script src="script.js"></script>
// </body>
// </html>

//Js
//Self-invoking function
(function(children, partner, location, job) {
  const message = `You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.`;
  // Create an element to show it in the DOM
  const div = document.createElement('div');
  div.textContent = message;
  document.body.appendChild(div); // adds it to the page
})(5, 'Husband', 'the world', 'person');


//Ex7:
//Html
// <!-- index.html -->
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Welcome User</title>
// </head>
// <body>

//   <nav id="navbar">
//   
//   </nav>

//   <script src="script.js"></script>
// </body>
// </html>

//Js
(function(userName) {
  const navbar = document.getElementById('navbar');
  const userDiv = document.createElement('div');
  userDiv.style.display = "flex";
  userDiv.style.alignItems = "center";
  userDiv.style.gap = "10px";
  const profileImg = document.createElement('img');
  profileImg.src = 'https://static.vecteezy.com/ti/vecteur-libre/p1/2387693-icone-de-profil-utilisateur-vectoriel.jpg';
  profileImg.style.width = '30px';
  const nameSpan = document.createElement('span');
  nameSpan.textContent = `Welcome, ${userName}!`;
  userDiv.appendChild(profileImg);
  userDiv.appendChild(nameSpan);
  navbar.appendChild(userDiv);
})('John');


//Ex8:
//Html
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Order</title>
// </head>
// <body>
//   <div id="juice-order"></div>
//   <script src="script.js"></script>
// </body>
// </html>

//Js
function makeJuice (sizeDrink) {
  let ingredients = [];
  //Part1:
  //   function addIngredients(ingred1, ingred2, ingred3){
  //     const sentence = `The client wants a ${sizeDrink} juice, containing ${ingred1}, ${ingred2}, ${ingred3}`
  //     document.getElementById('juice-order').textContent= sentence;
  // }
  //Part2:
  function addIngredients(ingred1, ingred2, ingred3){
    ingredients.push(ingred1, ingred2, ingred3);
  }
  function displayJuice(){
    const sentence = `The client wants a ${sizeDrink} juice, containing ${ingredients.join(", ")}`;
    document.getElementById('juice-order').textContent= sentence;
  }
  addIngredients('Orange', 'Banana', 'Strawberry')
  addIngredients('apple', 'mint', 'ginger')
  displayJuice();
}
makeJuice('large');



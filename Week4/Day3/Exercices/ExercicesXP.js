//ex1:
function displayNumbersDivisible(divisor=23){
    let sum = 0;
    let output = "";
    for (let i = 0; i < 500; i++) {
        if (i % divisor === 0){
            output += i + " ";
            sum += i;
        }   
    }
    console.log("Outcome : ", output);
    console.log("Sum : ", sum);
};

displayNumbersDivisible();
displayNumbersDivisible(45); 


//ex2:
const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry":1
}  
const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry":10
} 
let shoppingList = ['banana', 'orange', 'apple'];

function myBill() {
    let total = 0;
    for (let i of shoppingList) {
        if (i in stock && stock[i] > 0) {
            total += prices[i];
            stock[i] -= 1;
        }
    }
    console.log('Total price : ', total);
    console.log('Stock : ', stock);
}

myBill()


//ex3:
function changeEnough(itemPrice, amountOfChange) {
  const coinValues = [0.25, 0.10, 0.05, 0.01];
  let totalChange = 0;
  for (let i = 0; i < amountOfChange.length; i++) {
    totalChange += amountOfChange[i] * coinValues[i];
  }
  return totalChange >= itemPrice;
}

console.log(changeEnough(4.25, [25, 20, 5, 0])); // true
console.log(changeEnough(14.11, [2, 100, 0, 0])); // false
console.log(changeEnough(0.75, [0, 0, 20, 5])); // true

//ex4:
function hotelCost(nights) {
  const costPerNight = 140;
  return nights * costPerNight;
}

function planeRideCost(destination) {
  destination = destination.toLowerCase();
  if (destination === "london") return 183;
  if (destination === "paris") return 220;
  return 300;
}

function rentalCarCost(days) {
  const costPerDay = 40;
  let total = days * costPerDay;
  if (days > 10) {
    total *= 0.95; // 5% discount
  }
  return total;
}

function totalVacationCost() {
  let nights, destination, days;

  do {
    nights = parseInt(prompt("How many nights would you like to stay in the hotel?"));
  } while (isNaN(nights) || nights <= 0);

  do {
    destination = prompt("What is your destination?");
  } while (!destination || !isNaN(destination));

  do {
    days = parseInt(prompt("How many days would you like to rent the car?"));
  } while (isNaN(days) || days <= 0);

  const hotel = hotelCost(nights);
  const plane = planeRideCost(destination);
  const car = rentalCarCost(days);

  console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}`);
  console.log(`Total vacation cost: $${hotel + plane + car}`);
}

totalVacationCost();


//ex5:
//Html
/* <div id="container">Users:</div>
<ul class="list">
    <li>John</li>
    <li>Pete</li>
</ul>
<ul class="list">
    <li>David</li>
    <li>Sarah</li>
    <li>Dan</li>
</ul> */

//Js
const div = document.getElementById('container');
console.log(div);

const peteLi = document.querySelectorAll('li')[1]; 
peteLi.textContent = "Richard";
console.log(peteLi);         
// const allListItems = document.querySelectorAll("li");
// allListItems.forEach((li) => {
//     if (li.textContent === "Pete") {
//         li.textContent = "Richard";
//     }
// });

document.querySelectorAll("ul")[1].querySelectorAll("li")[1].remove();

const allUls = document.querySelectorAll("ul");
allUls.forEach(ul => {
  ul.querySelector("li").textContent = "Maryam";
});

allUls.forEach(ul => {
  ul.classList.add("student_list");
});

allUls[0].classList.add("university", "attendance");

div.style.backgroundColor = "lightblue";
div.style.padding = "10px";

const secondUl = allUls[1];
secondUl.querySelectorAll("li").forEach(li => {
  if (li.textContent === "Dan") {
    li.style.display = "none";
  }
});

document.querySelectorAll("li").forEach(li => {
  if (li.textContent === "Richard") {
    li.style.border = "1px solid black";
  }
});

document.body.style.fontSize = "18px";

if (div.style.backgroundColor === "lightblue") {
  const names = Array.from(document.querySelectorAll("ul li"))
    .map(li => li.textContent)
    .filter(name => name && name !== "Dan");
  alert(`Hello ${names.join(" and ")}`);
}


//ex6:
//Html
/* <div id="navBar">
    <ul>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Home</a></li>
        <li><a href="#">My Friends</a></li>
        <li><a href="#">Messenger</a></li>
        <li><a href="#">My Pics</a></li>
    </ul>
</div> */

//Js
const navBar = document.getElementById("navBar");
navBar.setAttribute("id", "socialNetworkNavigation");

const newLi = document.createElement("li");
const logoutText = document.createTextNode("Logout");
newLi.appendChild(logoutText);
const ul = document.querySelector("#socialNetworkNavigation ul");
ul.appendChild(newLi);

const firstLi = ul.firstElementChild;
const lastLi = ul.lastElementChild;

console.log("First link text:", firstLi.textContent);
console.log("Last link text:", lastLi.textContent);


//ex7:
const allBooks = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    image: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
    alreadyRead: true
  },
  {
    title: "The Pursuit of Happyness",
    author: "Chris Gardner",
    image: "https://covers.openlibrary.org/b/id/34094-L.jpg",
    alreadyRead: false
  }
];

const section = document.querySelector(".listBooks");

allBooks.forEach(book => {
  const bookDiv = document.createElement("div");
  bookDiv.style.marginBottom = "20px";

  const bookInfo = document.createElement("p");
  bookInfo.textContent = `${book.title} written by ${book.author}`;
  if (book.alreadyRead) {
    bookInfo.style.color = "red";
  }

  const bookImage = document.createElement("img");
  bookImage.src = book.image;
  bookImage.style.width = "100px";

  bookDiv.appendChild(bookInfo);
  bookDiv.appendChild(bookImage);
  section.appendChild(bookDiv);
});




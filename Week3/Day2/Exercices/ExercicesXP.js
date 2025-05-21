//ex1:
//part1:
const people = ["Greg", "Mary", "Devon", "James"];
people.shift();
console.log(people);
people[2] = "Jason";
console.log(people);
people.push("Maryam");
console.log(people);
console.log(people.indexOf("Mary"));
console.log(people.slice(1));
console.log(people.indexOf("Foo"));  // returns -1 — this is the standard return value to indicate “not found”
let last = people[people.length - 1];
console.log(last);
//part2:
for(let i = 0; i < people.length; i++ ) {
    console.log(people[i]);
}
for(let i = 0; i < people.length; i++ ) {
    console.log(people[i]);
    if (people[i] === "Devon") break;
}


//ex2:
let colors = ["White", "Red", "Black", "Brown", "Beige"];
for(let i=0; i < colors.length; i++){
  console.log(`My #${i+1} choice is ${colors[i]}`);
}
const suffix = ["st", "nd", "rd"];
for (let i = 0; i < colors.length; i++) {
  console.log(`My ${i+1}${suffix[i] || "th"} choice is ${colors[i]}`);  // th default value
}


//ex3:
let number = prompt("Enter a number:");
while (isNaN(number) || Number(number) < 10) {
  number = prompt("Number is less than 10. Please enter a new number:");
}
console.log("You entered:", number);


//ex4:
const building = {
  numberOfFloors: 4,
  numberOfAptByFloor: {
    firstFloor: 3,
    secondFloor: 4,
    thirdFloor: 9,
    fourthFloor: 2,
  },
  nameOfTenants: ["Sarah", "Dan", "David"],
  numberOfRoomsAndRent:  {
    sarah: [3, 990],
    dan:  [4, 1000],
    david: [1, 500],
  },
};

console.log("Number of floors:", building.numberOfFloors);
console.log("Apts on 1st floor:", building.numberOfAptByFloor.firstFloor);
console.log("Apts on 3rd floor:", building.numberOfAptByFloor.thirdFloor);

const secondTenant = building.nameOfTenants[1]; // Dan
const rooms = building.numberOfRoomsAndRent[secondTenant.toLowerCase()][0];
console.log(`Second tenant is ${secondTenant}, has ${rooms} rooms.`);

const rentSarah = building.numberOfRoomsAndRent.sarah[1];
const rentDavid = building.numberOfRoomsAndRent.david[1];
const rentDan = building.numberOfRoomsAndRent.dan[1];
if (rentSarah + rentDavid > rentDan) {
  building.numberOfRoomsAndRent.dan[1] = 1200;
  console.log("Dan's rent has been increased to 1200.");
}


//ex5:
const family = {
  father: "AbdelMouyd",
  mother: "Khadija",
  child: "Maryam"
};
for (let key in family) {
  console.log("Key:", key);
}
for (let key in family) {
  console.log("Value:", family[key]);
}


//ex6:
const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
};
let sentence = "";
for (let key in details) {
  sentence += key + " " + details[key] + " ";
}
console.log(sentence.trim()); 


//ex7:
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];
let secretName = names
  .map(name => name[0]) 
  .sort()               
  .join("");            
console.log("Secret Society Name:", secretName); 

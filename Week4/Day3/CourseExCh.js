// //
// var employee = {    // Object we want to destructure
//     firstname: 'Jon',
//     lastname: 'Snow',
//     dateofbirth: '1990'
// };
// // Destructuring the object into our variables
// var { firstname, lastname, dateofbirth } = employee;
// console.log( firstname, lastname, dateofbirth);
// // Destructuring the object into variables with
// // different names than the object variables
// var { firstname: fn, lastname: ln, dateofbirth: dob } = employee;
// console.log( fn, ln, dob);
// // Destructuring the object into variables by 
// // assigning default values 
// var { firstname = 'default firstname', 
//       lastname = 'default lastname', 
//       country = 'default country' } = employee;
// console.log("\n After setting default values")
// console.log( firstname, lastname, country);


// //
// myCar['make'] = 'Ford';
// myCer['year'] = 1969;
// myCar.model = 'Mustang';
// console.log(myCar.color);

// let myCar = new Object()
// let x = 'start';
// myCar[x] = 'spoon';
// console.log(myCar);


// //
// function showProps(obj, objName) {
//   let result = '';
//   for (let i in obj) {
//     // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
//     if (obj.hasOwnProperty(i)) {
//       result += `${objName}.${i} = ${obj[i]}\n`;
//     }
//   }
//   return result;
// }
// showProps(myCar, "myCar")
// myCar.make = Ford
// myCar.model = Mustang
// myCar.year = 1969


// //
// //name //age
// const person = {
//   name: 'Lydia',
//   age: 21,
// };
// for (const item in person) {
//   console.log(item);
// }


// //
// let myCar = {
//   color : 'blue',
//   details : {
//     plateNumber: 123,
//     name : "Ford"
//   }
// }
// let myNewCar = {...myCar}
// console.log("myNewCar : ", myNewCar) 
// // SHALLOW COPYING
// myCar.color = "red"
// console.log("myNewCar.color :", myNewCar.color)
// // myNewCar.color : blue -- UNCHANGED
// console.log("myCar.color :", myCar.color)
// // myCar.color : red -- CHANGED
// // DEEP COPYING
// myCar.details.plateNumber = 345
// console.log("myNewCar.details.plateNumber :", myNewCar.details.plateNumber)
// // myNewCar.details.plateNumber : 345 -- CHANGED
// console.log("myCar.details.plateNumber :", myCar.details.plateNumber)
// // myCar.details.plateNumber : 345 : red -- CHANGED


//
let date = document.getElementById('datetime');
date.addEventListener("change",function(event){
    let date = new Date(event.target.value);
    console.log(date);
  }
);

let now = new Date();
console.log(now);

let dateString = now.toString();
console.log('toString',dateString);

let day = now.getDay();
console.log('getDay',day);

let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
let dayName = dayNames[day];
console.log('dayNames',dayName);

console.log('getMonth',now.getMonth() + 1)
//returns the month of the date from 0 to 11,
//with 0 being January and 11 being December.

console.log('getDate',now.getDate())
// gives us the number for the dat of the month.

console.log('getFullYear',now.getFullYear())
// returns the 4 digit version of the year.

console.log('getHours',now.getHours())
// gives us a number from 0 to 23,
//which corresponds to midnight and 11pm.

console.log('getMinutes',now.getMinutes())
// returns the minutes of the hour from 0 to 59.

console.log('getSeconds',now.getSeconds())
// returns the seconds of the minute from 0 to 59.

console.log('getMilliseconds',now.getMilliseconds())
// returns a number from 0 to 999.

console.log('getTime',now.getTime())
// gives us the number of milliseconds that have elapsed since Jan 1, 1970 midnight UTC.

let today = new Date();
let anotherDay = new Date(2021,1,19, 11, 55)
let diff = anotherDay - today;
console.log('diff',diff);
let days = diff / (1000 * 60 * 60 * 24);
console.log('days',days);
console.log(Math.floor(days));
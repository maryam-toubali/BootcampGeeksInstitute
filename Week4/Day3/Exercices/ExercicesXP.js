//Ex1:
// The output: I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207])
const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
}
const {name, location: {country, city, coordinates: [lat, lng]}} = person;
console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);


//Ex2:
function displayStudentInfo(objUser){  // Or destructure directly: ..udentInfo({ first, last })
    //destructuring
    const {first, last} = objUser
    console.log(`Your full name is ${first} ${last}`)
}
displayStudentInfo({first: 'Elie', last:'Schoppik'});


//Ex3:
const users = { user1: 18273, user2: 92833, user3: 90315 }
const userArry = Object.entries(users);
console.log(userArry);
const multiplId = userArry.map(([key, value]) =>[key, value * 2]);
console.log(multiplId);


//Ex4:
// The output: object
class Person {
  constructor(name) {
    this.name = name;
  }
}
const member = new Person('John');
console.log(typeof member);


//Ex5:
class Dog {
  constructor(name) {
    this.name = name;
  }
};
  // 1: 
// class Labrador extends Dog {
//   constructor(name, size) {
//     this.size = size;
//   }
// };

  // 2: This constructor can extend the Dog class successfully:
// * Calls super(name) before using this — required in subclasses.
// * Passes the name argument to the Dog constructor.
// * Adds the size property for the Labrador class.
class Labrador extends Dog {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
};

  // 3: 
// class Labrador extends Dog {
//   constructor(size) {
//     super(name);
//     this.size = size;
//   }
// };
  // 4: 
// class Labrador extends Dog {
//   constructor(name, size) {
//     this.name = name;
//     this.size = size;
//   }
// };


//Ex6: 
//
// [2] === [2] → False | { } === { } → False
// JavaScript checks "Are these the exact same box?" → No → So it's false.
// In JavaScript, objects and arrays are reference types, and the === 
// operator checks if they point to the same object in memory — not just 
// if they have the same content. In both cases, you're comparing two 
// separate instances, so the result is false.
//
const object1 = { number: 5 };  
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5};
object1.number = 4;
console.log(object2.number) // 4 same object
console.log(object3.number) // 4 same object
console.log(object4.number) // 5 different object
//
class Animal {
    constructor(name, type, color){
        this.name = name;
        this.type = type;
        this.color = color;
    }
}
class Mammal extends Animal {
  sound(animalSound) {
    let colorStr = Array.isArray(this.color) ? this.color.join(' and ') : this.color;  // this.color could be an array or string
    return `${animalSound}! I'm a ${this.type}, named ${this.name} and I'm ${colorStr}`;
  }
};
farmerCow = new Mammal('Lily', 'cow', ['brown', 'white']);
console.log(farmerCow.sound('Moooo'));
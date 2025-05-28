//Ex1:
// const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
// const displayColors = () => { 
//  for( let i = 0; i < colors.length; i++ ) { 
//  console.log(`${i+1}# choice is ${colors[i]}.`)
//  }
//  colors.includes("Violet") ? console.log("Yeah") : console.log("No...");  // or: some(color => color === 'Violet')
// } 
// displayColors();

//Ex2:
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th","st","nd","rd"];
const displayColors = () => { 
for( let i = 0; i < colors.length; i++ ) { 
    (i+1 <= 3) ? console.log(`${i+1}${ordinal[i+1]} choice is ${colors[i]}.`) : console.log(`${i+1}${ordinal[0]} choice is ${colors[i]}.`)
    }
} 
displayColors();

//Ex3:
//The spread operator ... breaks an iterable (like a string, array, Object.)(Numbers Not iterable? It breaks) into individual elements.
//------1------
// output: ["bread", "carrot", "potato", "chicken", "apple", "orange"]
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];
const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);
//------2------
// output: ['U', 'S', 'A']
const country = "USA";
console.log([...country]);
//------Bonus------
// output: [undefined, undefined] // ( not [,,]/ [undefined, undefined, undefined]) 
let newArray = [...[,,]];
console.log(newArray);

//Ex4:
const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];
const welcomeStudents = users.map(user => `Hello ${user.firstName}`);
console.log(welcomeStudents);
const FullStackRes = users.filter(user => user.role === 'Full Stack Resident');
console.log(FullStackRes);
const lastNamesFSRs = users
.filter(user => user.role === 'Full Stack Resident')
.map(user => user.lastName);
console.log(lastNamesFSRs);

//Ex5:
const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];
const combine = epic.reduce((acc, currentWord) => acc + ' ' + currentWord );
console.log(combine);

//Ex6:
const students = [{name: "Ray", course: "Computer Science", isPassed: true}, 
               {name: "Liam", course: "Computer Science", isPassed: false}, 
               {name: "Jenner", course: "Information Technology", isPassed: true}, 
               {name: "Marco", course: "Robotics", isPassed: true}, 
               {name: "Kimberly", course: "Artificial Intelligence", isPassed: false}, 
               {name: "Jamie", course: "Big Data", isPassed: false}];
const studentPass = students.filter(user => user.isPassed === true);
console.log(studentPass);
studentPass.forEach(student => 
    console.log(`Good Job ${student.name} you passed the course in ${student.course}`)
); // or students.filter(student => student.isPassed).forEach(...);

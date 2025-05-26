let person = {fname:"John", lname:"Doe", age:25};
for (let x in person) {
  console.log(x) //fname lname age
  console.log(person[x]) // John Doe 25
}
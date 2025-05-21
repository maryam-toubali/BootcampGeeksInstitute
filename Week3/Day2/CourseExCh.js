//
let names= ["john", "sarah", 23, "Rudolf",34]

for (let i=0; i < names.length; i++){
    if (typeof(names[i]) !== "string"){      // can also use != but we use !== for the best practice
        continue;
    }
    if (names[i][0] !== names[i][0].toUpperCase()){   
        names[i] = names[i][0].toUpperCase() + names[i].slice(1);
    }
}
console.log(names);

for (let i=0; i < names.length; i++){
    if (typeof(names[i]) !== "string"){
        break;
    }
    else { 
        console.log(names[i]);
    }
}

//
let user = {
    username: "maryam",
    password: "123"
};
let database = [user];
let newsfeed = [
  {
    username: "Sara",
    timeline: "Enjoying a sunny day"
  },
  {
    username: "Zineb",
    timeline: "Just finished my JavaScript project!"
  },
  {
    username: "Halima",
    timeline: "Coding late night"
  }
];
console.log("Database:", database);
console.log("Newsfeed:", newsfeed);

//
let name = prompt("What's your name?", "Guest");                                // 1. Ask the user for their name using prompt()
let wantsGreeting = confirm("Would you like a personalized welcome message?");  // 2. Confirm if they want a personalized greeting
if (wantsGreeting) {                                                            // 3. Show a message based on their answer
  alert(`Welcome, ${name}! We're happy to see you.`);
} else {
  alert("Welcome! Enjoy your visit.");
}
  

//
let birthYear = 1998;
let futureYear = 2100;
let possibleAge = futureYear - birthYear;
console.log(`I will be ${possibleAge} in ${futureYear}`);

//
let addressNumber = 10;
let addressStreet = "Al Maghrib Street";
let country = "Morocco";
let globalAddress = `I live in ${addressNumber} ${addressStreet}, in ${country}`;
console.log(globalAddress);

//
console.log('To be or not to be'.indexOf('To'));
console.log('To be or not to be'.indexOf(' '));
console.log('To be or not to be'.indexOf('o', 2));
console.log('To be or not to be'.indexOf('be', 4));
console.log('To be or not to be'.indexOf('to'));
console.log('To be or not to be'.indexOf('B'));
console.log('To be or not to be'.indexOf('', 9))

//
string = "A-quick-brown-fox" //string to be split
array_of_strings = string.split("-") //The split() function 
console.log(string) //note that the split function doesn't change the original string
console.log(array_of_strings)

string = "A quick brown fox" //string to be split
array_of_strings = string.split("") //The split() function 
console.log(string) //note that the split function doesn't change the original string
console.log(array_of_strings)

//
console.log(3 || 'Orange');
console.log('' || 'Orange');
console.log(true || 0);
console.log(undefined || null);

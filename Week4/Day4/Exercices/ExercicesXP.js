// <!--Ex1:-->
// <!DOCTYPE html>
// <html>
// <head>
//   <title>Simple Form</title>
// </head>
// <body>
// <!-- Since the form uses the GET method and action="" (same page), the data will appear in 
//  the URL after submission: http://127.0.0.1:5501/Week4/Day4/Exercices/ExerciceXP.html?name=maryam+&comments=hello+ -->
//   <form method="GET" action="">
//     <label for="name">Name</label><br>
//     <input type="text" id="name" name="name"><br><br>
//     <label for="comments">Comments</label><br>
//     <textarea id="comments" name="comments" rows="4" cols="50"></textarea><br><br>
//     <input type="submit" value="Send">
//   </form>
// </body>
// </html>


// <!--Ex2:-->
// <!DOCTYPE html>
// <html>
// <head>
//   <title>Simple POST Form</title>
// </head>
// <body>
// <!--
// The data is included in the request body (not visible in the URL).
// To see the sent data:
// Open your browser’s Developer Tools (usually fn + F12 or right-click → Inspect) -
// Go to the Network tab - Submit the form - Select the new POST request that appears -
// Look under Payload or Form Data section — the form inputs will be listed there.    
// -->
//   <form method="POST" action="">
//     <label for="name">Name</label><br>
//     <input type="text" id="name" name="name"><br><br>
//     <label for="comments">Comments</label><br>
//     <textarea id="comments" name="comments" rows="4" cols="50"></textarea><br><br>
//     <input type="submit" value="Send">
//   </form>
// </body>
// </html>


//Ex3:
const marioGame = {
  detail : "An amazing game!",
  characters : {
      mario : {
        description:"Small and jumpy. Likes princesses.",
        height: 10,
        weight: 3,
        speed: 12,
      },
      bowser : {
        description: "Big and green, Hates princesses.",
        height: 16,
        weight: 6,
        speed: 4,
      },
      princessPeach : {
        description: "Beautiful princess.",
        height: 12,
        weight: 2,
        speed: 2,
      }
  }
};

// All nested objects within marioGame (like characters, and each character’s data) 
// are also converted into nested JSON objects. The whole structure and hierarchy are 
// preserved inside the JSON string. That means the nested objects become nested JSON 
// objects inside the string, maintaining the exact structure
const jsonString = JSON.stringify(marioGame);
console.log(jsonString);

// This pauses the code in browser DevTools if it's open
debugger;

const prettyJson = JSON.stringify(marioGame, null, 2);
console.log(prettyJson);

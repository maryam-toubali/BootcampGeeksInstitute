const gameInfo = [
 {
   username: "john",
   team: "red",
   score: 5,
   items: ["ball", "book", "pen"]
 },
 {
   username: "becky",
   team: "blue",
   score: 10,
   items: ["tape", "backpack", "pen"]
 },
 {
   username: "susy",
   team: "red",
   score: 55,
   items: ["ball", "eraser", "pen"]
 },
 {
   username: "tyson",
   team: "green",
   score: 1,
   items: ["book", "pen"]
 },
];
const usernames = [];
gameInfo.forEach(gamer => usernames.push(`${gamer.username}!`));
console.log(usernames);
const winners = [];
gameInfo.forEach(gamer => {(gamer.score > 5)? winners.push(`${gamer.username}!`): null }) 
console.log(winners);
const total = gameInfo.reduce((acc, gamer) => acc + gamer.score, 0);
console.log(total);

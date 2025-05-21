//Using one loop:
let star = "";
for (let i = 0; i < 6; i++) {
  star += "* ";
  console.log(star.trim());   // trim() remove the extra space
}

//using two nested for loops:
for (let i = 0; i < 6; i++) {
  let star = "";
  for (let j = 0; j <= i; j++) {
    star += "* ";
  }
  console.log(star.trim());   
}
//ch:
let sentence = 'The movie is not that bad, I like it';
let wordNot = sentence.indexOf("not");
let wordBad = sentence.indexOf("bad");

if (wordBad > wordNot) {
  let newSentence = sentence.slice(0, wordNot) + "good" + sentence.slice(wordBad + 3);  // or: use substring()/slice & replace() 
  console.log(newSentence);
} else {
  console.log(sentence);
};

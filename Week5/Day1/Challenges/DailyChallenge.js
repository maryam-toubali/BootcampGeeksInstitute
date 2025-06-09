//Ch1:
function makeAllCaps([...words]){
return new Promise((resolve, reject) => {
if (words.every(word => typeof word === 'string')){
    resolve(words.map(word => word.toUpperCase()))
}
else {
    reject("All inputs must be strings");
}
});
}
function sortWords(words) {
  return new Promise((resolve, reject) => {
    if (words.length > 4) {
      resolve(words.sort());
    } else {
      reject("Error: Array length is too short to sort.");
    }
  });
}

//in this example, the catch method is executed
makeAllCaps([1, "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error))

//in this example, the catch method is executed
makeAllCaps(["apple", "pear", "banana"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result))
      .catch(error => console.log(error))

//in this example, you should see in the console, 
// the array of words uppercased and sorted
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
      .then((arr) => sortWords(arr))
      .then((result) => console.log(result)) //["APPLE","BANANA", "KIWI", "MELON", "PEAR"]
      .catch(error => console.log(error))


//Ch2:
const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`

function toJs() {
  return new Promise((resolve, reject) => {
    const morseObj = JSON.parse(morse);
    if (Object.keys(morseObj).length === 0) {
      reject("Error: Morse object is empty.");
    } else {
      resolve(morseObj);
    }
  });
}
function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    const input = prompt("Enter a word or sentence").toLowerCase();
    const morseTranslation = [];
    for (let char of input) {
      if (morseJS[char]) {
        morseTranslation.push(morseJS[char]);
      } else {
        reject(`Error: Character '${char}' not in Morse dictionary.`);
        return;
      }
    }
    resolve(morseTranslation);
  });
}
function joinWords(morseTranslation) {
  const container = document.createElement("pre");
  container.textContent = morseTranslation.join('\n');
  document.body.appendChild(container);
}

toJs()
  .then(result => toMorse(result))
  .then(morseArr => joinWords(morseArr))
  .catch(error => console.log(error));



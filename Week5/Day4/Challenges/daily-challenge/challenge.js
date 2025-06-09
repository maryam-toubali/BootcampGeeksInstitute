const greet = require('./greeting');
const showMessage = require('./colorful-message');
const readFileContent = require('./read-file');

console.log('\n=== Challenge Start ===');
console.log(greet('Superstar Developer'));

showMessage();
readFileContent();

console.log('=== Challenge Complete ===');

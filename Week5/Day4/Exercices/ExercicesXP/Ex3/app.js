const { readFile, writeFile } = require('./fileManager');

const data = readFile('Hello World.txt');
console.log('Read from file:', data);

writeFile('Bye World.txt', 'Writing to the file');
console.log('Wrote to file successfully!');

const fs = require('fs');
const path = require('path');

function readFileContent() {
  const filePath = path.join(__dirname, 'files', 'file-data.txt');
  const data = fs.readFileSync(filePath, 'utf8');
  console.log('\n📄 File Content:\n' + data);
}

module.exports = readFileContent;

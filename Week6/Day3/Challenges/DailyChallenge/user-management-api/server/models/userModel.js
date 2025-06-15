const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../users.json');

async function readUsers() {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

async function writeUsers(users) {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

module.exports = {
    readUsers,
    writeUsers
};

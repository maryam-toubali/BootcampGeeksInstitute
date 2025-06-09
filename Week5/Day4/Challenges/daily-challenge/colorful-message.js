const chalk = require('chalk');

function showMessage() {
  console.log(chalk.blue.bgYellow.bold('🌟 You are rocking Node.js! 🌟'));
}

module.exports = showMessage;

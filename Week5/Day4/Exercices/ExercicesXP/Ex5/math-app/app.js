const _ = require('lodash');
const { add, multiply } = require('../math');

console.log('Sum:', add(3, 7));
console.log('Product:', multiply(4, 5));
console.log('Max:', _.max([3, 8, 2, 9]));

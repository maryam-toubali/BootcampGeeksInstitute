import { people } from './data.js';

function averageAge(data) {
  const total = data.reduce((sum, person) => sum + person.age, 0);
  return total / data.length;
}

console.log(`Average Age: ${averageAge(people)}`);

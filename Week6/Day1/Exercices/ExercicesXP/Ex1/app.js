const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'your_database_name',
    port: 5432
  }
});
knex('actors')
  .select('first_name', 'last_name')
  .then(console.log);
knex('actors')
  .select('*')
  .then(console.log);
knex('actors')
  .where({ first_name: 'Matt' })
  .then(console.log);
knex('actors')
  .where({ first_name: 'Matt', last_name: 'Damon' })
  .then(console.log);
knex('actors')
  .where('number_oscars', '>=', 2)
  .then(console.log);
knex('actors')
  .where('actor_id', 1)
  .orWhere({ first_name: 'Angelina' })
  .then(console.log);
knex('actors')
  .insert({
    first_name: 'Gal',
    last_name: 'Gadot',
    age: '1985-04-30',
    number_oscars: 0
  }, ['actor_id', 'first_name', 'last_name'])
  .then(console.log);
knex('actors')
  .insert({
    first_name: 'Gal',
    last_name: 'Gadot',
    age: '1985-04-30',
    number_oscars: 0
  }, ['*'])
  .then(console.log);
knex('actors')
  .where('first_name', 'Gal')
  .andWhere('last_name', 'Gadot')
  .update({
    number_oscars: 2,
    age: '1985-04-29'
  }, ['actor_id', 'number_oscars'])
  .then(console.log);
knex('actors')
  .where('first_name', 'Gal')
  .andWhere('last_name', 'Gadot')
  .del(['actor_id', 'first_name', 'last_name'])
  .then(console.log);

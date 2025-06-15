const db = require('../config/db');

async function registerUser(userData, hashedPassword) {
  return db.transaction(async trx => {
    const [user] = await trx('users')
      .insert({
        email: userData.email,
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name
      })
      .returning('*');

    await trx('hashpwd').insert({
      username: userData.username,
      password: hashedPassword
    });

    return user;
  });
}

function getAllUsers() {
  return db('users').select('id', 'email', 'username', 'first_name', 'last_name');
}

function getUserById(id) {
  return db('users').where({ id }).first();
}

function getUserPasswordByUsername(username) {
  return db('hashpwd').where({ username }).first();
}

function updateUser(id, updatedData) {
  return db('users').where({ id }).update(updatedData).returning('*');
}

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  getUserPasswordByUsername,
  updateUser
};

const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

const saltRounds = 10;

async function register(req, res) {
  try {
    const { email, username, first_name, last_name, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await UserModel.registerUser(
      { email, username, first_name, last_name },
      hashedPassword
    );

    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    if (err.constraint === 'users_username_unique' || err.constraint === 'hashpwd_username_unique') {
      res.status(400).json({ message: 'Username already exists' });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: 'Username and password required' });

    const userPwdRecord = await UserModel.getUserPasswordByUsername(username);

    if (!userPwdRecord) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, userPwdRecord.password);

    if (match) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getUsers(req, res) {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await UserModel.getUserById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const updatedUser = await UserModel.updateUser(id, updatedData);
    if (!updatedUser.length) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  register,
  login,
  getUsers,
  getUserById,
  updateUser
};

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/userModel');

// POST /register
const register = async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;

    if (!firstName || !lastName || !email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const users = await userModel.readUsers();

        const usernameExists = users.some(user => user.username === username);
        const emailExists = users.some(user => user.email === email);

        if (usernameExists || emailExists) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: uuidv4(),
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword
        };

        users.push(newUser);
        await userModel.writeUsers(users);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// POST /login
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
    }

    try {
        const users = await userModel.readUsers();
        const user = users.find(u => u.username === username);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.json({ message: `Welcome ${user.firstName} ${user.lastName}` });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// GET /users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.readUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// GET /users/:id
const getUserById = async (req, res) => {
    try {
        const users = await userModel.readUsers();
        const user = users.find(u => u.id === req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// PUT /users/:id
const updateUser = async (req, res) => {
    const { firstName, lastName, email, username } = req.body;

    try {
        const users = await userModel.readUsers();
        const index = users.findIndex(u => u.id === req.params.id);

        if (index === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        users[index] = { ...users[index], firstName, lastName, email, username };

        await userModel.writeUsers(users);
        res.json(users[index]);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUser
};

const { v4: uuidv4 } = require('uuid');
const taskModel = require('../models/taskModel');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.readTasks();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read tasks' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const tasks = await taskModel.readTasks();
        const task = tasks.find(t => t.id === req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read tasks' });
    }
};

const createTask = async (req, res) => {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTask = {
        id: uuidv4(),
        title,
        description,
        status
    };

    try {
        const tasks = await taskModel.readTasks();
        tasks.push(newTask);
        await taskModel.writeTasks(tasks);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task' });
    }
};

const updateTask = async (req, res) => {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const tasks = await taskModel.readTasks();
        const index = tasks.findIndex(t => t.id === req.params.id);
        if (index === -1) return res.status(404).json({ error: 'Task not found' });

        tasks[index] = { id: req.params.id, title, description, status };
        await taskModel.writeTasks(tasks);
        res.json(tasks[index]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const tasks = await taskModel.readTasks();
        const filtered = tasks.filter(t => t.id !== req.params.id);
        if (tasks.length === filtered.length) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await taskModel.writeTasks(filtered);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};

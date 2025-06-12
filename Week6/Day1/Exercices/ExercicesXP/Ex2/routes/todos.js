const express = require('express');
const router = express.Router();

let todos = []; // in-memory database

// GET all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// POST new todo
router.post('/', (req, res) => {
  const { title } = req.body;
  const newTodo = { id: todos.length + 1, title };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update todo
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).send('Todo not found');
  todo.title = title;
  res.json(todo);
});

// DELETE todo
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;

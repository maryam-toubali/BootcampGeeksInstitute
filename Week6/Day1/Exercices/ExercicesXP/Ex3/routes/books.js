const express = require('express');
const router = express.Router();

let books = []; // in-memory database

// GET all books
router.get('/', (req, res) => {
  res.json(books);
});

// POST new book
router.post('/', (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).send('Book not found');
  const { title, author } = req.body;
  book.title = title;
  book.author = author;
  res.json(book);
});

// DELETE book
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: 'Book deleted' });
});

module.exports = router;

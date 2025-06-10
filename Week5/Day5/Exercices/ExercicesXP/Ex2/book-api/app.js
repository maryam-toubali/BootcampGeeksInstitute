const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simulated database (array of books)
let books = [
  { id: 1, title: "1984", author: "George Orwell", publishedYear: 1949 },
  { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", publishedYear: 1937 }
];

// GET /api/books – Return all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET /api/books/:bookId – Return specific book
app.get('/api/books/:bookId', (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const book = books.find(b => b.id === bookId);
  if (book) res.status(200).json(book);
  else res.status(404).json({ message: "Book not found" });
});

// POST /api/books – Create a new book
app.post('/api/books', (req, res) => {
  const newId = books.length ? books[books.length - 1].id + 1 : 1;
  const newBook = { id: newId, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

let books = require('../models/bookModel');

// Get all books
const getAllBooks = (req, res) => {
  res.json(books);
};

// Get book by ID
const getBookById = (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const book = books.find(b => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

// Create new book
const createBook = (req, res) => {
  const { title, author, publishedYear } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    publishedYear
  };
  books.push(newBook);
  res.status(201).json(newBook);
};

// Export all functions
module.exports = {
  getAllBooks,
  getBookById,
  createBook
};

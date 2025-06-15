const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Read all books
router.get('/', bookController.getAllBooks);

// Read one book
router.get('/:bookId', bookController.getBookById);

// Create book
router.post('/', bookController.createBook);

module.exports = router;

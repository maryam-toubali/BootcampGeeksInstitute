const express = require('express');
const router = express.Router();

// Route: homepage
router.get('/', (req, res) => {
  res.send('Welcome to Homepage!');
});

// Route: about page
router.get('/about', (req, res) => {
  res.send('About Us Page');
});

module.exports = router;

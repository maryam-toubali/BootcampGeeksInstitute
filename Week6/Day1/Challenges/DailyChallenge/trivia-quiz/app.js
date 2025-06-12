const express = require('express');
const app = express();

// Import router
const quizRouter = require('./routes/quiz');

// Use router
app.use('/quiz', quizRouter);

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

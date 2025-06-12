const express = require('express');
const router = express.Router();

// Hard-coded questions
const triviaQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  { question: "What is the largest mammal in the world?", answer: "Blue whale" }
];

// This will act like simple in-memory session storage
let currentQuestionIndex = 0;
let score = 0;

// GET /quiz --> Start or get current question
router.get('/', (req, res) => {
  if (currentQuestionIndex >= triviaQuestions.length) {
    return res.json({ message: "Quiz finished. Go to /quiz/score to see your score." });
  }

  res.json({
    questionNumber: currentQuestionIndex + 1,
    question: triviaQuestions[currentQuestionIndex].question
  });
});

// POST /quiz --> submit answer
router.post('/', express.json(), (req, res) => {
  const userAnswer = req.body.answer;
  const correctAnswer = triviaQuestions[currentQuestionIndex].answer;

  if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
    score++;
    res.json({ message: "Correct!" });
  } else {
    res.json({ message: `Incorrect! The correct answer was ${correctAnswer}.` });
  }

  currentQuestionIndex++;
});

// GET /quiz/score --> Show score
router.get('/score', (req, res) => {
  res.json({
    finalScore: score,
    totalQuestions: triviaQuestions.length
  });

  // Reset quiz for next time
  currentQuestionIndex = 0;
  score = 0;
});

module.exports = router;

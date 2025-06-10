// server.js
const express = require('express');
const app = express();
const path = require('path');

const emojis = [
  { emoji: '😀', name: 'Smile' },
  { emoji: '🐶', name: 'Dog' },
  { emoji: '🌮', name: 'Taco' },
  { emoji: '🚗', name: 'Car' },
  { emoji: '📚', name: 'Books' },
  { emoji: '🍕', name: 'Pizza' },
];

let score = 0;

app.use(express.static('public'));
app.use(express.json());

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Send emoji and choices
app.get('/emoji', (req, res) => {
  const correct = emojis[Math.floor(Math.random() * emojis.length)];

  const choices = new Set();
  choices.add(correct.name);

  while (choices.size < 4) {
    const random = emojis[Math.floor(Math.random() * emojis.length)];
    choices.add(random.name);
  }

  const shuffledChoices = Array.from(choices).sort(() => 0.5 - Math.random());

  res.json({
    emoji: correct.emoji,
    correctAnswer: correct.name,
    options: shuffledChoices,
  });
});

// Receive guess
app.post('/guess', (req, res) => {
  const { guess, correctAnswer } = req.body;

  const isCorrect = guess === correctAnswer;
  if (isCorrect) score += 1;
  else score = 0;

  res.json({ isCorrect, score });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

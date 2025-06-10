// public/script.js
let correctAnswer = '';

async function fetchNewEmoji() {
  const res = await fetch('/emoji');
  const data = await res.json();

  correctAnswer = data.correctAnswer;

  document.getElementById('emoji').textContent = data.emoji;

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  data.options.forEach(option => {
    const label = document.createElement('label');
    label.innerHTML = `
      <input type="radio" name="guess" value="${option}" required>
      ${option}
    `;
    optionsDiv.appendChild(label);
    optionsDiv.appendChild(document.createElement('br'));
  });
}

document.getElementById('guess-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);
  const guess = form.get('guess');

  const res = await fetch('/guess', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guess, correctAnswer })
  });

  const result = await res.json();
  document.getElementById('feedback').textContent = result.isCorrect ? '✅ Correct!' : '❌ Wrong!';
  document.getElementById('score').textContent = result.score;

  fetchNewEmoji();
});

// Initial emoji
fetchNewEmoji();

const express = require('express');
const { fetchPosts } = require('./data/dataService');
const app = express();
const PORT = 5000;

app.use(express.json());

// Endpoint to get posts from JSONPlaceholder via Axios
app.get('/posts', async (req, res) => {
  try {
    const posts = await fetchPosts();
    console.log("Data retrieved successfully.");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

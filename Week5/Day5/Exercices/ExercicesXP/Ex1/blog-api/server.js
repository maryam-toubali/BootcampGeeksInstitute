const express = require('express');
const app = express();
const PORT = 3000;

// Use JSON middleware to parse JSON bodies
app.use(express.json());

// In-memory "database"
let posts = [
  { id: 1, title: "First Post", content: "Welcome to the blog!" },
  { id: 2, title: "Second Post", content: "More interesting content..." }
];

// GET /posts – List all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// GET /posts/:id – Get a specific post
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) res.json(post);
  else res.status(404).json({ message: "Post not found" });
});

// POST /posts – Create a new post
app.post('/posts', (req, res) => {
  const newId = posts.length ? posts[posts.length - 1].id + 1 : 1;
  const newPost = { id: newId, ...req.body };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT /posts/:id – Update a post
app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index !== -1) {
    posts[index] = { id, ...req.body };
    res.json(posts[index]);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// DELETE /posts/:id – Delete a post
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(p => p.id !== id);
  res.json({ message: "Post deleted" });
});

// Catch-all error for invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

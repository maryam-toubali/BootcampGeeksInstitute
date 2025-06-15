const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Import routes
const bookRoutes = require('./server/routes/bookRoutes');
app.use('/api/books', bookRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Book API!');
});

// Error handling for not found routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const app = express();

app.use(express.json());

// Routes
const postRoutes = require('./server/routes/postRoutes');
app.use('/api', postRoutes);

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const app = express();

const taskRoutes = require('./server/routes/taskRoutes');

app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

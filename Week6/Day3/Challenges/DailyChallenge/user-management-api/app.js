const express = require('express');
const app = express();
const userRoutes = require('./server/routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for forms
app.use(express.static('public'));

app.use('/', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

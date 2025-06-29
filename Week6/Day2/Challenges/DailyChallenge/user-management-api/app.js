const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./server/routes/userRoutes');
app.use('/', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

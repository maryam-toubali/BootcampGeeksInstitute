const express = require('express');
const app = express();

app.use(express.json()); // allows JSON body parsing

const todosRouter = require('./routes/todos'); // import router
app.use('/todos', todosRouter); // mount router

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

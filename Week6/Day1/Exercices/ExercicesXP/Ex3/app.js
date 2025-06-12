const express = require('express');
const app = express();

app.use(express.json()); // parse JSON body

const booksRouter = require('./routes/books'); // import router
app.use('/books', booksRouter); // mount router

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

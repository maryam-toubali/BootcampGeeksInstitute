const express = require('express');
const app = express();

const routes = require('./routes/index');  // <-- import router

app.use('/', routes);  // <-- mount router

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

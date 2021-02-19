const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/bookAPI');
const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

bookRouter.route('/books').get((req, res) => {
  const response = { hello: 'this is my api' };
  res.json(response);
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my API');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

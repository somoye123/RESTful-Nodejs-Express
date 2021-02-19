const express = require('express');
const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/bookAPI');
const app = express();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

// Add middlewares for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my API');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

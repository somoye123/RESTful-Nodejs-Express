const express = require('express');
const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/bookAPI');
const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');

// Add middlewares for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

bookRouter
  .route('/books')
  .post((req, res) => {
    const book = new Book(req.body);
    book.save();
    res.status(201).json(book);
  })
  .get((req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });

bookRouter.route('/books/:bookId').get((req, res) => {
  Book.findById(req.params.bookId, (err, book) => {
    if (err) {
      return res.send(err);
    }
    return res.json(book);
  });
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my API');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const Book = require('./book.model');

exports.createBook = async (req, res, next) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res.status(200).send({ message: 'Book posted sucessfully', book: newBook });
  } catch (error) {
    console.log('Error creating a book ', error);
    res.status(500).send({ message: 'Failed to create a book ' });
  }
};

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.log('Error getting all books', error);
    res.send(500).send({ message: 'Unable to fetch all books' });
  }
};

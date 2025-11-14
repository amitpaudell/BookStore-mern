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
    res.status(500).send({ message: 'Unable to fetch all books' });
  }
};

exports.getBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: 'book not found' });
    }
    res.status(200).send(book);
  } catch (error) {
    console.log('Error getting all books', error);
    res.status(500).send({ message: 'Unable to fetch all books' });
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      res.status(404).send({ message: 'Book is not found' });
    }
    res.status(200).send({
      message: 'Book updated sucessfully',
      updatedBook,
    });
  } catch (error) {
    console.log('Error updating a books', error);
    res.status(500).send({ message: 'Failed to update a book' });
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBooks = await Book.findByIdAndDelete(id);
    if (!deletedBooks) {
      res.status(404).send({ message: 'Book not found' });
    }
    res.status(200).send({
      message: 'Book deleted sucessfully',
      book: deletedBooks,
    });
  } catch (error) {
    console.log('Error deleting a books', error);
    res.status(500).send({ message: 'Failed to delete a book' });
  }
};

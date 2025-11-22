const express = require('express');

const router = express.Router();
const bookController = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');

//create a book
router.post('/create-book', verifyAdminToken, bookController.createBook);

//get all books
router.get('/', bookController.getBooks);

//get single book
router.get('/:id', bookController.getBook);

//update a book
router.put('/edit/:id', verifyAdminToken, bookController.updateBook);

//delete a book
router.delete('/:id', verifyAdminToken, bookController.deleteBook);

module.exports = router;

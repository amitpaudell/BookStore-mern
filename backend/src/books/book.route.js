const express = require('express');

const router = express.Router();
const bookController = require('./book.controller');

router.post('/create-book', bookController.createBook);

router.get('/', bookController.getBooks);

router.get('/:id', bookController.getBook);

router.put('/edit/:id', bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

module.exports = router;

const express = require('express');

const router = express.Router();
const bookController = require('./book.controller');

router.post('/create-book', bookController.createBook);

router.get('/', bookController.getBooks);

module.exports = router;

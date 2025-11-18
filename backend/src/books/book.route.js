const express = require('express');

const router = express.Router();
const bookController = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');

router.post('/create-book', verifyAdminToken, bookController.createBook);

router.get('/', bookController.getBooks);

router.get('/:id', bookController.getBook);

router.put('/edit/:id', verifyAdminToken, bookController.updateBook);

router.delete('/:id', verifyAdminToken, bookController.deleteBook);

module.exports = router;

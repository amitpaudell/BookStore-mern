const express = require('express');

const router = express.Router();
const orderController = require('./order.controller');

router.post('/create-order', orderController.createOrder);
router.get('/email/:email', orderController.getOrderByEmail);

module.exports = router;

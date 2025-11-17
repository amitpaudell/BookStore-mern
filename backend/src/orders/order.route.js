const express = require('express');

const router = express.Router();
const orderController = require('./order.controller');

router.post('/create-order', orderController.createOrder);

module.exports = router;

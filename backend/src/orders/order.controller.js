const Order = require('./order.model');

exports.createOrder = async (req, res, next) => {
  try {
    const newOrder = await Order(req.body);
    const saveOrder = await newOrder.save();
    res.status(200).json({ message: 'Order place sucessfully' }, saveOrder);
  } catch (error) {
    console.error('Error while creating order', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

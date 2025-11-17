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

exports.getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json({ message: 'Orders not found' });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.log('Error fetching the orders');
    res.status(500).json({ message: 'Failed to fetch the orders' });
  }
};

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
require('dotenv').config();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://book-store-mern-pearl.vercel.app',
    ],
    credentials: true,
  })
);

//routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats');

app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  app.use('/', (req, res) => {
    res.send('Book Store Server is running!');
  });
}

main()
  .then(() => console.log('Mongodb connect successfully!'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

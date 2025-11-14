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
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);

//routes
const bookRoutes = require('./src/books/book.route');
app.use('/api/books', bookRoutes);

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

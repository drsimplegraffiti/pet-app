require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db');
const animalRoute = require('./routes/animals');
const contactUsRoute = require('./routes/contact-us');
const newsLetterRoute = require('./routes/newsletter');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5678;
connectDB();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.json({ urlencoded: false }));

app.use('/animals', animalRoute);
app.use('/contact-us', contactUsRoute);
app.use('/newsletter', newsLetterRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404) res.status(404).json({ message: 'Not found' });
  else res.status(500).json({ message: 'Something looks wrong :( !!!' });
});

app.listen(port, () => {
  console.clear();
  console.log(`Server is running on port ${port}`);
});

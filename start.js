/* eslint-disable no-console */
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
if (process.env.NODE_ENV !== 'production') require('dotenv').config({
  path: `./.${process.env.NODE_ENV}.env`
});

const app = require('./server');

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});
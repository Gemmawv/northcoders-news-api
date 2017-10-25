/* eslint-disable no-console */
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
if (process.env.NODE_ENV !== 'production') require('dotenv').config({
  path: `./.${process.env.NODE_ENV}.env`
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes/api');
const cors = require('cors');

const db = process.env.DB_URI || process.env.DB;

mongoose.connect(db, { useMongoClient: true }, function (err) {
  if (!err) {
    console.log(`connected to the Database: ${process.env.NODE_ENV}`);
  } else {
    console.log(`error connecting to the Database ${err}`);
  }
});

app.use(cors());

app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.status(200).send('All good!');
});

app.use('/api', api);

app.use(function (err, req, res, next) {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  }
  next(err);
});

app.use(function (err, req, res, next) {  // eslint-disable-line no-unused-vars
  if (err.name === 'CastError') {
    return res.status(422).json({ message: 'Incorrect/Invalid ID' });
  }
  res.status(500).json({ message: 'Server error' });
});

module.exports = app;
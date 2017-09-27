/* eslint-disable */

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const api = require('./routes/api');
const cors = require ('cors');

const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const PORT = config.PORT[process.env.NODE_ENV] || process.env.PORT;

mongoose.connect(db, { useMongoClient: true }, function (err) {
  if (!err) {
    console.log(`connected to the Database: ${db}`);
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

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});

app.use(function (err, req, res, next) {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  }
  next(err);
});

app.use(function (err, req, res, next) {
  if (err.name === 'CastError') {
    return res.status(422).json({ message: 'Incorrect/Invalid ID' });
  }
  res.status(500).json({ message: 'Server error' });
});

module.exports = app;
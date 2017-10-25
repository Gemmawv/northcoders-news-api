const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const router = require('express').Router();
const models = require('../models/models');

router.put('/:comment_id', function (req, res, next) {
  const _id = req.params.comment_id;
  models.Comments.findOne({ _id })
    .then((comment) => {
      if (comment === null) {
        const error = new Error(`Cannot find comment ${_id}`);
        error.status = 404;
        throw error;
      }
      if (req.query.vote === 'up') comment.votes += 1;
      if (req.query.vote === 'down') comment.votes -= 1;
      return comment.save();
    })
    .then((comment) => {
      res.status(201).json({ comment });
    })
    .catch(next);
});

router.delete('/:comment_id', function (req, res, next) {
  const id = req.params.comment_id;
  models.Comments.findOneAndRemove({ _id: id })
    .then((comment) => {
      if (comment === null) {
        const error = new Error(`Cannot find comment ${id}`);
        error.status = 404;
        throw error;
      }
      res.status(200).json({ message: 'Comment has been deleted.' });
    })
    .catch(next);
});

module.exports = router;
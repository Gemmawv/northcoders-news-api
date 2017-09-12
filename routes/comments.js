const router = require('express').Router();
const models = require('../models/models');

router.put('/:comment_id', function (req, res, next) {
    const _id = req.params.comment_id;
    models.Comments.findOne({ _id }, (err, comment) => {
        if (err) return next(err);
        if (comment === null) {
            const error = new Error(`Cannot find comment ${req.params.comment_id}`);
            error.status = 404;
            return next(error);
        }
    })
        .then((comment) => {
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
    models.Comments.findOneAndRemove({ belongs_to: id }, (err, comment) => {
        if (err) return next(err);
        if (comment === null) {
            const error = new Error(`Cannot find comment ${id}`);
            error.status = 404;
            return next(error);
        }
    })
        .then(() => {
            res.status(200).json({ message: 'Comment has been deleted.' });
        })
        .catch(next);
});

module.exports = router;
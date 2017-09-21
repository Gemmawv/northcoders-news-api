const router = require('express').Router();
const models = require('../models/models');

router.get('/', function (req, res, next) {
    models.Articles.find()
        .then((articles) => {
            return res.status(200).json({ articles });
        })
        .catch(next);
});

router.get('/:article_id/comments', function (req, res, next) {
    const slug = req.params.article_id;
    models.Comments.find({ belongs_to: slug })
        .then((commentsForArticles) => {
            if (commentsForArticles.length < 1) {
                return next({ status: 404, message: 'Article not found' });
            }
            res.status(200).json({ commentsForArticles });
        })
        .catch(next);
});

router.post('/:article_id/comments', function (req, res, next) {
    const _id = req.params.article_id;
    models.Articles.findById(_id)
        .then((article) => {
            if (article === null) {
                const error = new Error(`Cannot find article ${_id}`);
                error.status = 404;
                throw error;
            }
            const newComment = new models.Comments({
                body: req.body.body,
                belongs_to: _id
            });
            newComment.save();
            res.status(201).json({ comment: newComment });
        })
        .catch(next);

});

router.put('/:article_id', function (req, res, next) {
    const _id = req.params.article_id;
    models.Articles.findOne({ _id })
        .then((article) => {
            if (article === null) {
                const error = new Error(`Cannot find article ${_id}`);
                error.status = 404;
                throw error;
            }
            if (req.query.vote === 'up') article.votes += 1;
            if (req.query.vote === 'down') article.votes -= 1;
            return article.save();
        })
        .then((article) => {
            res.status(201).json({ article });
        })
        .catch(next);
});

module.exports = router;
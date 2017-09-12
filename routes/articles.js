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
    models.Articles.findById(req.params.article_id, (err, article) => {
        if (err) return next(err);
        if (article === null) {
            const error = new Error(`Cannot find article ${req.params.article_id}`);
            error.status = 404;
            return next(error);
        }
        let newComment = new models.Comments({
            body: req.body.body,
            belongs_to: req.params.article_id
        });
        newComment.save()
            .then((newComment) => {
                res.status(201).json({ comment: newComment });
            })
            .catch(next);
    });
});

module.exports = router;
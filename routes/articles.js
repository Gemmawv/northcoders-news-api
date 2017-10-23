const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const router = require('express').Router();
const models = require('../models/models');

router.get('/', function (req, res, next) {
  models.Articles.find()
    .then((articles) => {
      return Promise.all([articles, ...articles.map((article) => {
        return models.Users.findOne({ username: article.created_by });
      })]);
    })
    .then(([articles, ...users]) => {
      return articles.map((article, i) => {
        return Object.assign({}, article.toObject(), {
          avatar_url: users[i].avatar_url
        });
      });
    })
    .then((articles) => {
      return res.status(200).json({ articles });
    })
    .catch(next);
});

router.get('/:article_id', function (req, res, next) {
  const articleId = req.params.article_id;
  let article;
  models.Articles.findById(articleId)
    .then((articleDoc) => {
      if (articleDoc === null) {
        return next({ status: 404, message: 'Article not found' });
      }
      article = articleDoc.toObject();
      return models.Users.findOne({ username: article.created_by });
    })
    .then((user) => {
      return Object.assign({}, article, {
        avatar_url: user.avatar_url
      });
    })
    .then((article) => {
      res.status(200).json({ article });
    })
    .catch(next);
});

router.get('/:article_id/comments', function (req, res, next) {
  const articleId = req.params.article_id;
  models.Comments.find({ belongs_to: articleId })
    .then((commentsForArticles) => {
      return Promise.all([commentsForArticles, ...commentsForArticles.map((comment) => {
        return models.Users.findOne({ username: comment.created_by });
      })]);
    })
    .then(([commentsForArticles, ...users]) => {
      return commentsForArticles.map((comment, i) => {
        return Object.assign({}, comment.toObject(), {
          avatar_url: users[i].avatar_url
        });
      });
    })
    .then((commentsForArticles) => {
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
      let newComment = new models.Comments({
        body: req.body.body,
        belongs_to: _id
      });
      newComment.save()
        .then(() => {
          return models.Users.findOne({ username: newComment.created_by });
        })
        .then((user) => {
          newComment = Object.assign({}, newComment.toObject(), {
            avatar_url: user.avatar_url
          });
          res.status(201).json({ comment: newComment });
        });
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
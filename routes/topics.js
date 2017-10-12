const router = require('express').Router();
const models = require('../models/models');

router.get('/', function (req, res, next) {
  models.Topics.find()
    .then((topics) => {
      return res.status(200).json({ topics });
    })
    .catch(next);
});

router.get('/:topic_id/articles', function (req, res, next) {
  const topicId = req.params.topic_id;
  models.Articles.find({ belongs_to: topicId })
    .then((articlesByTopic) => {
      if (articlesByTopic.length < 1) {
        return next({ status: 404, message: 'Topic not found' });
      }
      return Promise.all([articlesByTopic, ...articlesByTopic.map((article) => {
        return models.Users.findOne({ username: article.created_by });
      })]);
    })
    .then(([articlesByTopic, ...users]) => {
      return articlesByTopic.map((article, i) => {
        return Object.assign({}, article.toObject(), {
          avatar_url: users[i].avatar_url
        });
      });
    })
    .then((articlesByTopic) => {
      res.status(200).json({ articlesByTopic });
    })
    .catch(next);
});

module.exports = router;
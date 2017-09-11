const router = require('express').Router();
const models = require('../models/models');

router.get('/', function (req, res, next) {
    models.Articles.find()
        .then((articles) => {
            return res.status(200).json({ articles });
        })
        .catch(next);
});

module.exports = router;
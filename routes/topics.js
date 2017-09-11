const router = require('express').Router();
const models = require('../models/models');

router.get('/', function (req, res, next) {
    models.Topics.find()
        .then((topics) => {
            return res.status(200).json({ topics });
        })
        .catch(next);
});

module.exports = router;
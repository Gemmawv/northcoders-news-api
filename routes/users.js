const router = require('express').Router();
const models = require('../models/models');

router.get('/:username', function (req, res, next) {
    const user = req.params.username;
    models.Users.find({ username: user })
        .then((user) => {
            if (user.length < 1) {
                return next({ status: 404, message: 'User not found' });
            }
            res.status(200).json({ user });
        })
        .catch(next);
});

module.exports = router;
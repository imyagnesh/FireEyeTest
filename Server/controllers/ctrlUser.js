const mongoose = require('mongoose');
const User = mongoose.model('User');
const logger = require('../../logger');
const utils = require('../utils');
const { save } = utils;

module.exports.addUser = (req, res, next) => {
    if(!req.body.username) {
        return res.status(400).json({
            success: false,
            message: "username require",
          });
    }
    const user = new User({
        username: req.body.username
    });
    save(user, res);
}

const mongoose = require('mongoose');
const Sequence = mongoose.model('Sequence');
const logger = require('../../logger');
const utils = require('../utils');
const { save, find } = utils;

module.exports.addSequence = (req, res, next) => {
    if(!req.body.sequence) {
        return res.status(400).json({
            success: false,
            message: "sequence require",
          });
    }
    const user = new Sequence({
        sequence: req.body.sequence
    });
    save(user, res);
}


module.exports.getSequence = (req, res, next) => {
    find(Sequence, {}, res);
}
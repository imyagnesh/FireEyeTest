const mongoose = require("mongoose");
const Click = mongoose.model("Click");
const Sequence = mongoose.model("Sequence");
const UnusualSequence = mongoose.model("UnusualSequence");
const logger = require("../../logger");
const utils = require("../utils");
const { save, find } = utils;

module.exports.onClickDiv = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({
      success: false,
      message: "username require"
    });
  }
  const click = new Click({
    username: req.body.username,
    clickOn: req.body.clickOn,
    clickTime: req.body.clickTime
  });

  save(click, res);

  Sequence.find({}, function(err, data) {
    data.forEach(item => {
      //get last records
      Click.find({})
        .sort("-clickTime")
        .limit(item.sequence.length)
        .select({ clickOn: 1, username: 1, clickTime: 1, _id: 0 })
        .exec(function(err, data) {
          if (
            JSON.stringify(data.reverse().map(data => data.clickOn)) ===
            JSON.stringify(item.sequence)
          ) {
            const unusualSequence = new UnusualSequence({
              sequence: item.sequence,
              sequenceData: data.reverse()
            });
            unusualSequence.save();
            var io = req.app.get("socketio");
            io.emit("FromAPI", data);
          }
        });
    });
  });
};

module.exports.getUnusualSequence = (req, res, next) => {
  find(UnusualSequence, {}, res);
};

module.exports.getUnusualSequenceById = (req, res, next) => {
  UnusualSequence.findById(req.params.id, function(err, data) {
    if (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Personal Information Saved.",
      data: data
    });
  });
};

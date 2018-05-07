const mongoose = require("mongoose");

const UnusualSequenceSchema = new mongoose.Schema({
  sequence: [Number],
  sequenceData: [
    {
      username: String,
      clickOn: Number,
      clickTime: Date
    }
  ]
});

module.exports = mongoose.model("UnusualSequence", UnusualSequenceSchema);

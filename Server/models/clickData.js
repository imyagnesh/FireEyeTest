const mongoose = require('mongoose');

const ClickSchema = new mongoose.Schema({
    username: String,
    clickOn: Number,
    clickTime: Date
  });

  module.exports = mongoose.model('Click', ClickSchema);
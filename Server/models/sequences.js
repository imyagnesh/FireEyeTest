const mongoose = require('mongoose');

const SequenceSchema = new mongoose.Schema({
    sequence: [Number],
  });

  module.exports = mongoose.model('Sequence', SequenceSchema);
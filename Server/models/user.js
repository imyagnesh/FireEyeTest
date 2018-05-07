const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: [true, 'username should be unique.'],
      required: [true, 'username is required.'],
    },
  },{strict: true});

  module.exports = mongoose.model('User', UserSchema);
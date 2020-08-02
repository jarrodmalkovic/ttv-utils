const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feedback = new Schema(
  {
    username: {
      type: String,
      default: 'Anonymous',
    },
    type: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'Feedback',
  }
);

module.exports = mongoose.model('Feedback', Feedback);

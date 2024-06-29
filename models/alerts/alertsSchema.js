const mongoose = require('mongoose');

const alertSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  immediateneeds: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
  },
});

module.exports = mongoose.model('Alert', alertSchema);

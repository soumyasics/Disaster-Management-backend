const mongoose = require("mongoose");

const volunteerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },

  skills: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    unique: true,
    required: true,

    dropDups: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,

    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
//   image: {
//     type: Object,
//   },
});
module.exports = mongoose.model("volunteer", volunteerSchema);

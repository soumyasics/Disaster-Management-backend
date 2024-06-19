const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
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
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  // firstname: {
  //   type: String,
  //   required: true,
  // },
  // lastname: {
  //   type: String,
  //   required: true,
  // },
  // gender: {
  //   type: String,
  //   required: true,
  // },
  // age: {
  //   type: Number,
  //   required: true,
  // },
  // street: {
  //   type: String,
  //   required: true,
  // },
  // city: {
  //   type: String,
  //   required: true,
  // },
  // pincode: {
  //   type: Number,
  //   required: true,
  // },

  // state: {
  //   type: String,
  //   required: true,
  // },

  // phone: {
  //   type: Number,
  //   unique: true,
  //   required: true,

  //   dropDups: true,
  // },
  // email: {
  //   type: String,
  //   unique: true,
  //   required: true,

  //   dropDups: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },
  // image: {
  //   type: Object,
  // },
});
module.exports = mongoose.model("users", userSchema);

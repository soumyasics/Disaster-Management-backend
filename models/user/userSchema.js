const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
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
  // image: {
  //   type: Object,
  // },
});
module.exports = mongoose.model("users", userSchema);

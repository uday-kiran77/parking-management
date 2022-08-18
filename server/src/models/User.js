const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
    trim: true,
    lowercase: true,
  },
  password: {
    required: true,
    type: String,
    trim: true,
  },
  fName: {
    required: true,
    type: String,
    trim: true,
  },
  lName: {
    required: true,
    type: String,
    trim: true,
  },
  role: {
    required: true,
    type: String,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    required: true,
    type: String,
    unique: true,
    trim: true,
  },
  createdBy: {
    required: true,
    type: String,
    trim: true,
  },
  vehNumber: {
    required: true,
    type: String,
    trim: true,
  },
  vehType: {
    required: true,
    type: String,
    trim: true,
  },
  entry: {
    required: true,
    type: Date,
    trim: true,
  },
  exit: {
    type: Date || null,
    trim: true,
  },
  amount: {
    type: mongoose.Types.Decimal128,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  exitIssued: {
    type: Boolean,
    default: false,
  },
});

const Token = mongoose.model("Token", userSchema);
module.exports = Token;

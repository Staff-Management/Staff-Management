const mongoose = require("mongoose");
const { isEmail } = require('validator')
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please enter an email'],
    validate: [isEmail, 'Please enter a valid email']
  },
  token: {
    type: String,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now,
    expires: 1800
  },
});

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
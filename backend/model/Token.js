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
    expires: 10800
  },
});

tokenSchema.statics.check = async function (reg_token) {
  const data = await Token.findOne({ token: reg_token });
  if (!data) {
    throw new Error("Invalid Token");
  }
  return data;
};

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
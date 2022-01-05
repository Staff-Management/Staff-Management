const mongoose = require("mongoose");
const { isEmail } = require('validator')
const bcrypt = require("bcryptjs");
const Car = require('./Car');
const Reference = require('./Reference');
const EmContact = require('./EmContact');
const WorkAuth = require("./WorkAuth");
const License = require("./License")
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please enter an email'],
    validate: [isEmail, 'Please enter a valid email']
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Please enter a username'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
  },
  role: {
    type: String,
    default: 'employee',
    enum: ['employee', 'hr']
  },
  firstName: {
    type: String,
  },
  secondName: {
    type: String,
  },
  preName: String, 
  midName: String, 
  avatar: {
    type: String, 
  },
  address: {
    type: String,
    required: [true, 'Please enter your address'],
  },
  cellPhone: {
    type: String,
    required: [true, 'Please enter your phone number'],
  },
  workPhone: {
    type: String,
  },
  carInfo: [{
    type: mongoose.Schema.ObjectId,
    ref: Car
  }],
  SSN: {
    type: String,
  },
  DOB: {
    type: Date,
  },
  Gender: {
    type: String,
  },
  reference: {
    type: mongoose.Schema.ObjectId,
    ref: Reference,
  },
  EmergencyContact: [{
    type: mongoose.Schema.ObjectId,
    ref: EmContact,
  }],
  workAuth: {
    type: mongoose.Schema.ObjectId,
    ref: WorkAuth,
  },
  driverLicense: {
    type: mongoose.Schema.ObjectId,
    ref: License,
  },
});

//Hashing the password
userSchema.pre("save", async function (next) {
  if (this.password)
    this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Checks to see if password matches.
userSchema.statics.login = async function (account, password) {
  const user = await User.findOne().or([ { email: account }, { username: account } ]);
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Account or password is wrong!");
  }
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
const mongoose = require("mongoose");
const { isEmail } = require('validator')
const bcrypt = require("bcryptjs");
const Car = require('./Car');
const Reference = require('./Reference');
const Address = require('./Address');
const EmergencyContact = require("./EmergencyContact")
const WorkAuth = require("./WorkAuth");
const DriverLicense = require("./DriverLicense")
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter an email'],
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
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  preferredName: {
    type: String,
  },
  avatar: {
    type: String, 
  },
  cell_phone: {
    type: String,
  },
  work_phone: {
    type: String,
  },
  car_info: {
    type: mongoose.Schema.ObjectId,
    ref: Car
  },
  ssn: {
    type: String,
  },
  birthday: {
    type: String,
  },
  gender: {
    type: String,
  },
  driverLicense: {
    type: String
  },
  perm_citizen: {
    type: String
  },
  green_card_citizen: {
    type: String
  },
  ref_info: {
    type: mongoose.Schema.ObjectId,
    ref: Reference,
  },
  emergency_contact_info: [{
    type: mongoose.Schema.ObjectId,
    ref: EmergencyContact,
  }],
  address_info: {
    type: mongoose.Schema.ObjectId,
    ref: Address,
  },
  work_auth_info: {
    type: mongoose.Schema.ObjectId,
    ref: WorkAuth,
  },
  dl_info: {
    type: mongoose.Schema.ObjectId,
    ref: DriverLicense,
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
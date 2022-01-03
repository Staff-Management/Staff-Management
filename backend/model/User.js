const mongoose = require("mongoose");
const { isEmail } = require('validator')
const bcrypt = require("bcryptjs");
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
    // unique: true,
    // required: [true, 'Please enter a username'],
  },
  password: {
    type: String,
    // required: [true, 'Please enter a password'],
    minlength: [8, 'Minimum password length is 8 character']
  },
  role: {
    type: String,
    enum: ['employee', 'hr']
  },
  registrationToken: {
    type: String,
    index: { unique: true, expires: '10s' }
  },
});

userSchema.path('registrationToken').index({ expires: 10 })

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
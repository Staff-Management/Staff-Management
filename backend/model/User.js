const mongoose = require("mongoose");
const { isEmail } = require('validator')
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    validate: [isEmail, "Please enter a valid email"]
  },
  password: String,
  enum: {
    type: String,
    default: 'user'
  }
});

//Hashing the password
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Checks to see if password matches.
userSchema.statics.login = async function (email, password) {
  const user = await User.findOne({ email });
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("email or password is wrong!");
  }
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
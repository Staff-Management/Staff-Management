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
    unique: true,
    required: [true, 'Please enter a username'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [8, 'Minimum password length is 8 character']
  },
  role: {
    type: String,
    default: 'user'
  },
  registrationToken: {
    type: String,
    createAt: {
      type: Date, 
      expires: 10, 
      default: Date.now
    }
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
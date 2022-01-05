const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require('validator')

const ref = new Schema({
  refFirstName: {
    type: String,
  },
  refSecondName: {
    type: String,
  }, 
  refMidName: String, 
  refEmail: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  refRelationship: {
    type: String, 
  }
});


const Reference = mongoose.model("Reference", ref);
module.exports = Reference;
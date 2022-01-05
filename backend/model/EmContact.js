const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require('validator')

const EmergencyContact = new Schema({
  emFirstName: {
    type: String,
  },
  emSecondName: {
    type: String,
  }, 
  emMidName: String, 
  emEmail: {
    type: String,
    // unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  emRelationship: {
    type: String, 
  }
});


const EmContact = mongoose.model("EmergencyContact", EmergencyContact);
module.exports = EmContact;
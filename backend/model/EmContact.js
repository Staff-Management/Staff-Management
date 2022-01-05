const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require('validator')

const EmergencyContact = new Schema({
    firstName: {
        type: String,
      },
      secondName: {
        type: String,
      }, 
      midName: String, 
      email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
      },
      Relationship: {
        type: String, 
        required: [true, 'Please enter your relationship'],
      }
});


const EmContact = mongoose.model("EmergencyContact", EmergencyContact);
module.exports = EmContact;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ref = new Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
      },
      secondName: {
        type: String,
        required: [true, 'Please enter your second name'],
      }, 
      midName: String, 
      email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Please enter an email'],
        validate: [isEmail, 'Please enter a valid email']
      },
      Relationship: {
        type: String, 
        required: [true, 'Please enter your relationship'],
      }
});


const Reference = mongoose.model("Reference", ref);
module.exports = Reference;
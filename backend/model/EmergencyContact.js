const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emergencyContactSchema = new Schema({
  em_firstname: {
    type: String,
  },
  em_middlename: {
    type: String,
  }, 
  em_lastname: {
    type: String,
  },
  em_phone: {
    type: String,
  },
  em_email: {
    type: String,
  },
  em_relationship: {
    type: String, 
  }
});

const EmergencyContact = mongoose.model("Emergency Contact", emergencyContactSchema);
module.exports = EmergencyContact;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const referenceSchema = new Schema({
  ref_firstname: {
    type: String,
  },
  ref_middlename: {
    type: String,
  }, 
  ref_lastname: {
    type: String,
  },
  ref_address1: {
    type: String,
  },
  ref_city: {
    type: String,
  },
  ref_state: {
    type: String,
  },
  ref_country: {
    type: String,
  },
  ref_zip: {
    type: String,
  },
  ref_phone: {
    type: String,
  },
  ref_email: {
    type: String,
  },
  ref_relationship: {
    type: String, 
  }
});


const Reference = mongoose.model("Reference", referenceSchema);
module.exports = Reference;
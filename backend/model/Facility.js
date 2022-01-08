const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facilitySchema = new Schema({
    numBeds: String,
    numMattress: String, 
    numTables: String,
});


const Facility = mongoose.model("Facility", facilitySchema);
module.exports = Facility;
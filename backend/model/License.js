const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverLicense = new Schema({
    number: String,
    expDate: Date,
    photo: {
        type: String,
        //something
    }
});


const License = mongoose.model("Driver License", driverLicense);
module.exports = License;
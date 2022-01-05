const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverLicense = new Schema({
    Number: String,
    expDate: Date,
    photo: {
        Type: String,
        //something
    }
});


const License = mongoose.model("Driver License", driverLicense);
module.exports = License;
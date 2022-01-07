const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverLicenseSchema = new Schema({
    driverLicense_num: String,
    driverLicense_exp: String
    // photo: {
    //     type: String,
    // }
});


const DriverLicense = mongoose.model("Driver License", driverLicenseSchema);
module.exports = DriverLicense;
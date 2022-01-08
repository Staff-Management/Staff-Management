const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverLicenseSchema = new Schema({
    driverLicense_num: {
        type: String,
    },
    driverLicense_exp: {
        type: String,
    }
});


const DriverLicense = mongoose.model("Driver License", driverLicenseSchema);
module.exports = DriverLicense;
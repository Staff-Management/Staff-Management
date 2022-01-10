const mongoose = require("mongoose");
const Tenants = require('./Tenants');
const Facility = require('./Facility');
const FacilityReports = require('./FacilityReports');
const Schema = mongoose.Schema;

const houseSchema = new Schema({
    landLord: String,
    landlordEmail: String,
    landLordPhone: String,
    address1: String,
    address2: String,
    city: String,
    numEmployees: String,
    state: {
        type: String,
    },
    zip: String,
    list_employee: [{
        type: mongoose.Schema.ObjectId,
        ref: Tenants
    }],
    facilityInfo: {
        type: mongoose.Schema.ObjectId,
        ref: Facility
    },
    // numReports: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: FacilityReports,
    // }]
});


const House = mongoose.model("Housing Information", houseSchema);
module.exports = House;
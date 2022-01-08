const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facilityReportSchema = new Schema({
    title: String, 
    description: String,
    createdBy: String,
    reportDate: String,
    status: {
        type: String,
        enum: ['Open', 'Closed', 'In Progress']
    },
});

const facilityReports = mongoose.model("Facility Reports", facilityReportSchema);
module.exports = facilityReports;
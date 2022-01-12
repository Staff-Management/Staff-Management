const mongoose = require("mongoose");
const Comment = require("./Comments");
const Schema = mongoose.Schema;

const facilityReportSchema = new Schema({
    title: String, 
    description: String,
    createdBy: String,
    month: Number,
    date: Number,
    email: String,
    year: Number,
    status: {
        type: String,
        default: 'Open',
        enum: ['Open', 'Closed', 'In Progress']
    },
    list_comment: [{
        type: mongoose.Schema.ObjectId,
        ref: Comment
    }]
});

const facilityReports = mongoose.model("Facility Reports", facilityReportSchema);
module.exports = facilityReports;
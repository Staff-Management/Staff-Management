const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workAuth = new Schema({
    Visa: {
        type: String,
        enum: ['Green Card', 'Citizen', 'H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'other']
    },
    photo: {
        type: String,
    },
    startDate: Date,
    endDate: Date,
});


const WorkAuth = mongoose.model("Work Authorization", workAuth);
module.exports = WorkAuth;
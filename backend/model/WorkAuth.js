const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workAuth = new Schema({
    Visa: {
        type: String
    },
    photo: {
        type: Buffer,
    },
    startDate: Date,
    endDate: Date,
});


const WorkAuth = mongoose.model("Work Authorization", workAuth);
module.exports = WorkAuth;
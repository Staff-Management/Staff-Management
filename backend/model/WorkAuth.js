const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workAuthSchema = new Schema({
    work_auth: {
        type: String,
    },
    other_work_auth: {
        type: String,
    },
    workAuth_start: {
        type: String,
    },
    workAuth_exp: {
        type: String,
    }
});


const WorkAuth = mongoose.model("Work Authorization", workAuthSchema);
module.exports = WorkAuth;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tenantSchema = new Schema({
    preferredName: String, 
    firstName: String,
    tenantsPhone: String,
});


const Tenants = mongoose.model("Tenants Information", tenantSchema);
module.exports = Tenants;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSechme = new Schema({
    address1: String,
    address2: String,
    city: String,
    state: {
        type: String,
        // enum: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 
        // 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 
        // 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 
        // 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
    },
    zip: String,
    country: String
});


const Address = mongoose.model("Address", addressSechme);
module.exports = Address;
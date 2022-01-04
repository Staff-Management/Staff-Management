const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Car = new Schema({
    make: String, 
    model: String, 
    Color: String,
});


const Car = mongoose.model("Car", Car);
module.exports = Car;
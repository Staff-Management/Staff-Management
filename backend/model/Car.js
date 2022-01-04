const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const car = new Schema({
    make: String, 
    model: String, 
    Color: String,
});


const Car = mongoose.model("Car", car);
module.exports = Car;
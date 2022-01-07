const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
    vehicle_maker: String, 
    vehicle_model: String, 
    vehicle_color: String,
});


const Car = mongoose.model("Car", carSchema);
module.exports = Car;
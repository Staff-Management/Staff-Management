const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
    vehicle_maker: {
        type: String,
    },
    vehicle_model: {
        type: String,
    },
    vehicle_color: {
        type: String,
    }
});


const Car = mongoose.model("Car", carSchema);
module.exports = Car;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  from_email: {
    type: String,
    required: true
  },
  to_email: {
    type: String,
    required: true
  },
  message: {
    type: String
  }
});


const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
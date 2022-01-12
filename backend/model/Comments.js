const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    description: String,
    createdBy: String,
    commentDate: Date,
});

const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;
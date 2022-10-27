const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactModelSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    phone: String,
});

module.exports = mongoose.model("contacts", ContactModelSchema);
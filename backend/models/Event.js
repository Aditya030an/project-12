const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  url: String,
  img: String,
  dateTime:String,
  price:String,
  location:String,
});

module.exports = mongoose.model("Event", eventSchema);

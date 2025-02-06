// models/Email.js
const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  email: { type: String, required: true }, // Email, required, and should be unique
  // You might add a timestamp here:
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Email", emailSchema);

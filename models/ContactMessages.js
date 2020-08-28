const mongoose = require("mongoose");

const ContactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const ContactMessage = mongoose.model("ContactMessage", ContactMessageSchema);

module.exports = ContactMessage;

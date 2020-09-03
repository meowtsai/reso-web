const mongoose = require("mongoose");

const ServiceRequestSchema = new mongoose.Schema({
  categories: {
    type: Array,
    required: true,
  },
  platforms: {
    type: Array,
    required: true,
  },
  genders: {
    type: String,
    required: true,
  },
  budget: {
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

const ServiceRequest = mongoose.model("ServiceRequest", ServiceRequestSchema);

module.exports = ServiceRequest;

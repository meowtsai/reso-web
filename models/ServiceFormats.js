const mongoose = require("mongoose");

const ServiceFormatSchema = new mongoose.Schema({
  key: { type: String, unique: true, index: true },
  cht: String,
  eng: String,
});
const ServiceFormat = mongoose.model("ServiceFormat", ServiceFormatSchema);

module.exports = { ServiceFormatSchema, ServiceFormat };

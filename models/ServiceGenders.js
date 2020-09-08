const mongoose = require("mongoose");

const ServiceGenderSchema = new mongoose.Schema({
  key: { type: String, unique: true, index: true },
  cht: String,
  eng: String,
});
const ServiceGender = mongoose.model("ServiceGender", ServiceGenderSchema);

module.exports = { ServiceGenderSchema, ServiceGender };

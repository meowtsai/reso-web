const mongoose = require("mongoose");

const PlatformSchema = new mongoose.Schema({
  key: { type: String, unique: true, index: true },
  cht: String,
  eng: String,
});
const ServicePlatform = mongoose.model("ServicePlatform", PlatformSchema);

module.exports = { PlatformSchema, ServicePlatform };

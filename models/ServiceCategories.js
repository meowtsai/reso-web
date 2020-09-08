const mongoose = require("mongoose");

const ServiceCategorySchema = new mongoose.Schema({
  key: { type: Number, unique: true, index: true },
  cht: String,
  eng: String,
});

const ServiceCategory = mongoose.model(
  "ServiceCategory",
  ServiceCategorySchema
);

module.exports = { ServiceCategorySchema, ServiceCategory };

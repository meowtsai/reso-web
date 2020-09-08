const mongoose = require("mongoose");

const ServiceGoalSchema = new mongoose.Schema({
  key: { type: String, unique: true, index: true },
  cht: String,
  eng: String,
});
const ServiceGoal = mongoose.model("ServiceGoal", ServiceGoalSchema);

module.exports = { ServiceGoalSchema, ServiceGoal };

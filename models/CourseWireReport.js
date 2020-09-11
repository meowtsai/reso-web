const mongoose = require("mongoose");

const CourseWireReportSchema = new mongoose.Schema({
  checkId: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bankName: {
    type: String,
    required: true,
  },
  wireName: {
    type: String,
    required: true,
  },
  bankCode: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  registerId: {
    type: String,
  },
});

const CourseWireReport = mongoose.model(
  "CourseWireReport",
  CourseWireReportSchema
);

module.exports = CourseWireReport;

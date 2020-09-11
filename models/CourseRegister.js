const mongoose = require("mongoose");

const CourseRegisterSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  checkId: {
    type: String,
    required: true,
  },
  registerDate: { type: Date, required: true },
  timeSlot: {
    type: String,
    enum: [
      "15:00~16:00",
      "16:30~17:30",
      "18:00~19:00",
      "21:30~22:30",
      "23:00~24:00",
    ],
    required: true,
  },
  discordAccount: {
    type: String,
    required: true,
  },
  name: {
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

  level: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number,
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
  note: {
    type: String,
  },
  status: {
    type: Number,
    enum: [1, 2, 4, 9], //1-初始  2-已回報 4-已經確認 9 取消資格
    required: true,
    default: 1,
  },
});

const CourseRegister = mongoose.model("CourseRegister", CourseRegisterSchema);

module.exports = CourseRegister;

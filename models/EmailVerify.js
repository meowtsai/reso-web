const mongoose = require("mongoose");

const EmailVerifySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const EmailVerify = mongoose.model("EmailVerify", EmailVerifySchema);

module.exports = EmailVerify;

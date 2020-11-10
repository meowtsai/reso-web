const mongoose = require("mongoose");

const CosplayApplySchema = new mongoose.Schema(
  {
    coser_name: {
      type: String,
      required: true,
    },
    coser_phone: {
      type: String,
      required: true,
    },
    coser_email: {
      type: String,
      required: true,
    },
    coser_citizen_id: {
      type: String,
      required: true,
    },
    work_subject: {
      type: String,
      required: true,
    },
    work_desc: {
      type: String,
      required: true,
    },
    cover_img: {
      type: String,
      required: true,
    },
    imgs: { type: Array, default: [] },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["SUBMITTED", "VERIFIED", "DISQUALIFIED"],
      default: "SUBMITTED",
    },
  },
  {
    timestamps: true,
  }
);

const CosplayApply = mongoose.model("CosplayApply", CosplayApplySchema);

module.exports = CosplayApply;

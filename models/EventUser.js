const mongoose = require("mongoose");

const EventUserSchema = new mongoose.Schema(
  {
    channelUid: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
    channel: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EventUser = mongoose.model("EventUser", EventUserSchema);

module.exports = EventUser;

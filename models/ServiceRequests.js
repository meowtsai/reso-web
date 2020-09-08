const mongoose = require("mongoose");

// const ServiceCategorySchema = new Schema({ key: Number, name: String });
// const PlatformSchema = new Schema({ key: String, name: String });
// const GenderSchema = new Schema({ key: Number, name: String });
// const ServiceGoalSchema = new Schema({ key: Number, name: String });
// const ServiceFormatSchema = new Schema({ key: Number, name: String });

const { ServiceCategorySchema } = require("./ServiceCategories");
const { ServiceFormatSchema } = require("./ServiceFormats");
const { ServiceGenderSchema } = require("./ServiceGenders");

const { ServiceGoalSchema } = require("./ServiceGoals");
const { PlatformSchema } = require("./ServicePlatforms");
const ServiceRequestSchema = new mongoose.Schema({
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ServiceCategory",
    },
  ],

  platforms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ServicePlatform",
    },
  ],
  genders: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceGender",
    required: true,
  },
  goals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ServiceGoal",
    },
  ],
  formats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ServiceFormat",
    },
  ],
  budget: {
    type: Number,
    required: true,
  },
  kolnumber: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },

  brandname: {
    type: String,
    required: true,
  },

  productname: {
    type: String,
    required: true,
  },
  producturl1: {
    type: String,
    required: true,
  },
  producturl2: {
    type: String,
  },
  producturl3: {
    type: String,
  },
  socialadperm: {
    type: Boolean,
    required: true,
  },
  socialadperm_weeks: {
    type: Number,
  },
  mediaperm: {
    type: Boolean,
    required: true,
  },
  mediaperm_weeks: {
    type: Number,
  },
  ip: {
    type: String,
    required: true,
  },
  main_ideas: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  date_start: {
    type: Date,
    required: true,
  },
  date_end: {
    type: Date,
    required: true,
  },
});

const ServiceRequest = mongoose.model("ServiceRequest", ServiceRequestSchema);

module.exports = ServiceRequest;

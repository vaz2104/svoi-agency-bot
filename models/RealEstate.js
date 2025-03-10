const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const RealEstateSchema = new Schema({
  clientName: {
    type: String,
  },
  clientPhone: {
    type: String,
    default: "",
  },
  objectDescription: {
    type: String,
    default: "",
  },
  dateRegistration: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
  requestType: {
    type: String,
  },
  typeRealEstateObject: {
    type: String,
  },
  location: {
    type: String,
    default: "",
  },
  budget: {
    type: String,
    default: "",
  },
  realtor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "",
  },
  mediaSource: {
    type: String,
    default: "",
  },
  comments: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model("RealEstate", RealEstateSchema);

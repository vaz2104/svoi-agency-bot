const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const NotificationSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  realEstate: {
    type: Schema.Types.ObjectId,
    ref: "RealEstate",
    default: null,
  },
  message: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model("Notification", NotificationSchema);

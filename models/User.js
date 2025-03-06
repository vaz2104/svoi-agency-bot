const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  userId: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  photoUrl: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "realtor", // admin | realtor
  },
  lastActiveSession: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
  dateRegistration: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
});

module.exports = model("User", UserSchema);

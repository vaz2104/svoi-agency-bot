const { Schema, model } = require("mongoose");
// const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const AuthSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  key: {
    type: String,
    default: "",
  },
});

module.exports = model("Auth", AuthSchema);

// FIXME export a model for Chirps
const mongoose = require("mongoose");
const { Schema } = mongoose;

const chirpSchema = new Schema({
  text: { type: String, require: true },
  createdDate: { type: Date, required: true, default: Date.now },
  username: { type: String, require: true },
  avatar: { type: String, require: true },
});

const ChirpModel = mongoose.model("chirp", chirpSchema);

module.exports = ChirpModel;

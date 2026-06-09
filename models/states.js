const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  country_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "country",
    required: true,
  },
  state_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("states", stateSchema);

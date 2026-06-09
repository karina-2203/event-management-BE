const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  state_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "state",
    required: true,
  },
  city_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("cities", citySchema);

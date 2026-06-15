const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  country_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("countries", countrySchema);

const { required } = require("joi");
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    country_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "countries",
      required: true,
    },
    state_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "states",
      required: true,
    },
    city_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cities",
      required: true,
    },
    address_line1: {
      type: String,
      required: true,
    },
    address_line2: {
      type: String,
    },
    zip_code: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("address", addressSchema);

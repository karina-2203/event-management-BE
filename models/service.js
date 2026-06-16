const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    event_manage_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
      required: true,
    },
    service_name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    service_description: {
      type: String,
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

module.exports = mongoose.model("services", serviceSchema);

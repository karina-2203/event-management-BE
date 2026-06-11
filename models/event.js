const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    event_name: {
      type: String,
      required: true,
    },
    event_description: {
      type: String,
      required: true,
    },
    event_image: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("events", eventSchema);

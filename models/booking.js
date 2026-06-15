const { required } = require("joi");
const mongoose = require("mongoose");
const { bookingStatus } = require("../libs/utils/enums");
const bookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },
    event_manage_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: true,
    },
    event_date: {
      type: Date,
      required: true,
    },
    additional_information: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        bookingStatus.PENDING,
        bookingStatus.CANCELLED,
        bookingStatus.APPROVED,
      ],
      default: bookingStatus.PENDING,
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

module.exports = mongoose.model("booking", bookingSchema);

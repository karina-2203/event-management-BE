const mongoose = require("mongoose");
const { status, roles } = require("../libs/utils/enums");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
    },
    profile_image: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: [status.ACTIVE, status.INACTIVE],
      default: status.ACTIVE,
    },
    role: {
      type: String,
      enum: [roles.USER, roles.ADMIN, roles.ORGANIZATION],
      default: roles.USER,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("user", userSchema);

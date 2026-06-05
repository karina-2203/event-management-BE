const mongoose = require("mongoose");
const logger = require("../../loggers/logger");
const message = require("../utils/message");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    logger.info(message.CONNECTION_DB_SUCCESS);
  } catch (error) {
    logger.error(message.CONNECTION_DB_ERROR, error);
    process.exit(1);
  }
};

module.exports = connectDB;

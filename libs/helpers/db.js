const mongoose = require("mongoose");
const logger = require("../../loggers/logger");
const {
  CONNECTION_DB_SUCCESS,
  CONNECTION_DB_ERROR,
} = require("../utils/message");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    logger.info(CONNECTION_DB_SUCCESS);
  } catch (error) {
    logger.error(CONNECTION_DB_ERROR, error);
    process.exit(1);
  }
};

module.exports = connectDB;

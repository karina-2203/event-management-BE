const { StatusCodes } = require("http-status-codes");

class AppError extends Error {
  constructor(
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    status = "error",
    message = "Something went wrong",
    data = null,
    error = null,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.status = status;
    this.data = data;
    this.error = error;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

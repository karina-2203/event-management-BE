const { StatusCodes } = require("http-status-codes");
const AppError = require("./handleException");
const { ResponseData } = require("../utils/enums");

/**
 * Global exception filter middleware for centralized error handling
 * Handles AppError, validation errors, MongoDB errors, and generic errors
 */
const allExceptionFilter = (err, req, res, next) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let status = ResponseData.ERROR;
  let message = "Something went wrong";
  let data = null;
  let error = null;

  // Handle AppError (custom application errors)
  if (err instanceof AppError) {
    statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    status = err.status || ResponseData.ERROR;
    message = err.message || "Something went wrong";
    data = err.data || null;
    error = err.error || null;
  }
  // Handle MongoDB duplicate key error (code: 11000)
  else if (err.code === 11000) {
    statusCode = StatusCodes.CONFLICT;
    status = ResponseData.ERROR;
    const field = Object.keys(err.keyPattern)[0];
    message = `A document with this ${field} already exists`;
    error = process.env.NODE_ENV === "production" ? null : err;
  }
  // Handle MongoDB validation errors
  else if (err.name === "ValidationError") {
    statusCode = StatusCodes.BAD_REQUEST;
    status = ResponseData.ERROR;
    message = "Validation failed";
    const validationErrors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    data = validationErrors;
    error = process.env.NODE_ENV === "production" ? null : err;
  }
  // Handle generic Error objects
  else if (err instanceof Error) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    status = ResponseData.ERROR;
    message = err.message || "Something went wrong";
    error = process.env.NODE_ENV === "production" ? null : err;
  }
  // Fallback for unknown error types
  else {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    status = ResponseData.ERROR;
    message = "Something went wrong";
    error = process.env.NODE_ENV === "production" ? null : err;
  }

  // Return consistent error response
  return res.status(statusCode).json({
    statusCode,
    status,
    message,
    data,
    error,
  });
};

module.exports = allExceptionFilter;

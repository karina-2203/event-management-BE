const { StatusCodes } = require("http-status-codes");
const { ResponseData } = require("../utils/enums");
const AppError = require("./handleException");

const handleResponse = (
  statusCode,
  status,
  message,
  data = null,
  error = null,
) => {
  const resolvedStatusCode = statusCode || StatusCodes.OK;

  if (status === ResponseData.SUCCESS) {
    return {
      statusCode: resolvedStatusCode,
      status,
      message,
      data,
      error,
    };
  }

  throw new AppError(
    statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    status,
    message,
    data,
    error,
  );
};

module.exports = handleResponse;

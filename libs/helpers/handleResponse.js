const { StatusCodes } = require("http-status-codes");
const { responseData } = require("../utils/enums");
const { AppError } = require("./handleException");

const handleResponse = (
  statusCode,
  status,
  message = null,
  data = null,
  error = null,
) => {
  const resolvedStatusCode = statusCode || StatusCodes.OK;

  const response = { statusCode: resolvedStatusCode, status };
  if (message !== null) response.message = message;
  if (data !== null) response.data = data;
  if (error !== null) response.error = error;

  if (status === responseData.SUCCESS) {
    return response;
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

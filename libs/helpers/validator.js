const { StatusCodes } = require("http-status-codes");
const { responseData } = require("../utils/enums");
const message = require("../utils/message");
const handleResponse = require("../helpers/handleResponse");
/**
 * Validates incoming request data against a Joi schema
 * @param {Joi.Schema} schema - Joi validation schema
 * @param {string} source - Data source to validate (body, params, query)
 * @returns {Function} Middleware function
 */
const validateRequest = (schema, source = "body") => {
  return (req, res, next) => {
    const data = req[source];
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const validationErrors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return handleResponse(
        StatusCodes.BAD_REQUEST,
        responseData.ERROR,
        message.VALIDATION_FAILED,
        validationErrors,
        null
      );
    }

    req[source] = value;
    next();
  };
};

module.exports = {
  validateRequest,
};

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
      const validationErrors = error.details.map((detail) => detail.message);

      return res.status(StatusCodes.BAD_REQUEST).json({
        statusCode: StatusCodes.BAD_REQUEST,
        status: responseData.ERROR,
        message: message.VALIDATION_FAILED,
        data: validationErrors,
        error: null,
      });
    }

    req[source] = value;
    next();
  };
};

module.exports = {
  validateRequest,
};

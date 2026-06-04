const AppError = require("./handleException");
const { StatusCodes } = require("http-status-codes");
const { ResponseData } = require("../utils/enums");

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

      return next(
        new AppError(
          StatusCodes.BAD_REQUEST,
          ResponseData.ERROR,
          "Validation failed",
          validationErrors,
          null,
        ),
      );
    }

    // Replace the original request data with validated data
    req[source] = value;
    next();
  };
};

module.exports = {
  validateRequest,
};

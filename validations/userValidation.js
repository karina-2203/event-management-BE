const Joi = require("joi");
const { status, roles } = require("../libs/utils/enums");

/**
 * Validation schema for creating a new user
 */
const createUserSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),

  email: Joi.string().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .required()
    .min(8)
    .max(150)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "any.required": "Password is required",
    }),

  phone_number: Joi.string()
    .pattern(/^[0-9+\-\s()]+$/)
    .optional()
    .max(10)
    .messages({
      "string.pattern.base": "Phone number must be a valid phone format",
    }),

  profile_image: Joi.string().trim().uri().optional().messages({
    "string.uri": "Profile image must be a valid URL",
  }),

  status: Joi.string()
    .valid(status.ACTIVE, status.INACTIVE)
    .optional()
    .messages({
      "any.only": `Status must be one of: ${status.ACTIVE}, ${status.INACTIVE}`,
    }),

  role: Joi.string()
    .valid(roles.USER, roles.ORGANIZATION)
    .optional()
    .messages({
      "any.only": `Role must be one of: ${roles.USER}, ${roles.ADMIN}, ${roles.ORGANIZATION}`,
    }),
});
/**
 * Validation schema for login
 */
const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});
module.exports = {
  createUserSchema,
  loginSchema,
};

const Joi = require("joi");
const { status, roles } = require("../libs/utils/enums");

/**
 * Validation schema for creating a new user
 */
const createUserSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is don't empty field",
    "any.required": "Name is required",
  }),

  email: Joi.string().lowercase().email().required().messages({
    "string.empty": "Email is don't empty field",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .required()
    .min(8)
    .max(150)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .messages({
      "string.empty": "Password is don't empty field",
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
    "string.empty": "Email is don't empty field",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is don't empty field",
    "any.required": "Password is required",
  }),
});

const profileSchema = Joi.object({
  name: Joi.string().optional().messages({
    "string.empty": "Name cannot be empty",
  }),

  phone_number: Joi.string()
    .pattern(/^[0-9+\-\s()]+$/)
    .optional()
    .max(10)
    .messages({
      "string.pattern.base": "Phone number must be a valid phone format",
      "string.max": "Phone number must not exceed 10 digits",
    }),

  profile_image: Joi.string().trim().uri().optional().messages({
    "string.uri": "Profile image must be a valid URL",
  }),
});

const otpSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is don't empty field",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),

  otp: Joi.number().integer().min(100000).max(999999).required().messages({
    "number.base": "OTP must be a number",
    "number.integer": "OTP must be an integer",
    "number.min": "OTP must be 6 digits",
    "number.max": "OTP must be 6 digits",
    "any.required": "OTP is required",
  }),

  newPassword: Joi.string()
    .required()
    .min(8)
    .max(150)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .messages({
      "string.empty": "New password is don't empty field",
      "string.min": "New password must be at least 8 characters",
      "string.pattern.base":
        "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "any.required": "New password is required",
    }),

  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("newPassword"))
    .messages({
      "string.empty": "Confirm password is don't empty field",
      "any.required": "Confirm password is required",
      "any.only": "Confirm password must match new password",
    }),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "string.empty": "Current password is don't empty field",
    "any.required": "Current password is required",
  }),

  newPassword: Joi.string()
    .required()
    .min(8)
    .max(150)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .messages({
      "string.empty": "New password is don't empty field",
      "string.min": "New password must be at least 8 characters",
      "string.pattern.base":
        "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "any.required": "New password is required",
    }),

  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("newPassword"))
    .messages({
      "string.empty": "Confirm password is don't empty field",
      "any.required": "Confirm password is required",
      "any.only": "Confirm password must match new password",
    }),
});

module.exports = {
  createUserSchema,
  loginSchema,
  profileSchema,
  otpSchema,
  changePasswordSchema,
};

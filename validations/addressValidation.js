const Joi = require("joi");

const addressSchema = Joi.object({
  country_id: Joi.string().required().messages({
    "string.base": "Country ID must be a string",
    "string.empty": "Country ID is don't empty field",
    "any.required": "Country ID is required",
  }),
  state_id: Joi.string().required().messages({
    "string.base": "State ID must be a string",
    "string.empty": "State ID is don't empty field",
    "any.required": "State ID is required",
  }),
  city_id: Joi.string().required().messages({
    "string.base": "City ID must be a string",
    "string.empty": "City ID is don't empty field",
    "any.required": "City ID is required",
  }),
  address_line1: Joi.string().required().messages({
    "string.base": "AddressLine 1 must be a string",
    "string.empty": "AddressLine 1 is don't empty field",
    "any.required": "AddressLine 1 is required",
  }),
  address_line2: Joi.string().optional().messages({
    "string.base": "Address Line 2 must be a string",
  }),
  zip_code: Joi.string()
    .pattern(/^\d{6}$/)
    .required()
    .messages({
      "string.base": "Zip Code must be a string",
      "string.empty": "Zip Code cannot be empty",
      "any.required": "Zip Code is required",
      "string.pattern.base": "Zip Code must be 6 digits",
    }),
});

const updateAddressSchema = Joi.object({
  address_id: Joi.string().required().messages({
    "string.base": "Address ID must be a string",
    "string.empty": "Address ID is don't empty field",
    "any.required": "Address ID is required",
  }),
  country_id: Joi.string().optional().messages({
    "string.base": "Country ID must be a string",
    "string.empty": "Country ID is don't empty field",
  }),
  state_id: Joi.string().optional().messages({
    "string.base": "State ID must be a string",
    "string.empty": "State ID is don't empty field",
  }),
  city_id: Joi.string().optional().messages({
    "string.base": "City ID must be a string",
    "string.empty": "City ID is don't empty field",
  }),
  address_line1: Joi.string().optional().messages({
    "string.base": "AddressLine 1 must be a string",
    "string.empty": "AddressLine 1 is don't empty field",
  }),
  address_line2: Joi.string().optional().messages({
    "string.base": "Address Line 2 must be a string",
  }),
  zip_code: Joi.string()
    .pattern(/^\d{6}$/)
    .optional()
    .messages({
      "string.base": "Zip Code must be a string",
      "string.empty": "Zip Code cannot be empty",
      "string.pattern.base": "Zip Code must be 6 digits",
    }),
});

const listAddressSchema = Joi.object({
  search: Joi.string().optional().allow("").messages({
    "string.base": "Search must be a string",
  }),
  page: Joi.number().integer().min(1).optional().default(1).messages({
    "number.base": "Page must be a number",
    "number.min": "Page must be at least 1",
  }),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .optional()
    .default(10)
    .messages({
      "number.base": "Limit must be a number",
      "number.min": "Limit must be at least 1",
      "number.max": "Limit cannot exceed 100",
    }),
  sortOrder: Joi.string()
    .valid("asc", "desc")
    .optional()
    .default("asc")
    .messages({
      "any.only": "Sort order must be either 'asc' or 'desc'",
    }),
  sortBy: Joi.string()
    .valid("address_line1", "zip_code")
    .optional()
    .default("address_line1")
    .messages({
      "any.only": "Sort by must be one of: address_line1, zip_code",
    }),
});

module.exports = {
  addressSchema,
  updateAddressSchema,
  listAddressSchema,
};

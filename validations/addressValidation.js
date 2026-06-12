const Joi = require("joi");

const addressSchema = Joi.object({
  country_id: Joi.string().required().messages({
    "string.empty": "Country ID is don't empty field",
    "any.required": "Country ID is required",
  }),
  state_id: Joi.string().required().messages({
    "string.empty": "State ID is don't empty field",
    "any.required": "State ID is required",
  }),
  city_id: Joi.string().required().messages({
    "string.empty": "City ID is don't empty field",
    "any.required": "City ID is required",
  }),
  address_line1: Joi.string().required().messages({
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
      "string.empty": "Zip Code cannot be empty",
      "any.required": "Zip Code is required",
      "string.pattern.base": "Zip Code must be 6 digits",
    }),
});

module.exports = {
  addressSchema,
};

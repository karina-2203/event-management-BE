const Joi = require("joi");

const serviceSchema = Joi.object({
  event_manage_id: Joi.string().required().messages({
    "string.empty": "Event ID is don't empty field",
    "any.required": "Event ID is required",
  }),
  service_name: Joi.string().required().messages({
    "string.empty": "Service name is don't empty field",
    "any.required": "Service name is required",
  }),
  service_description: Joi.string().required().messages({
    "string.empty": "Service description is don't empty field",
    "any.required": "Service description is required",
  }),
  price: Joi.number().required().messages({
    "number.empty": "Price is don't empty field",
    "any.required": "Price is required",
  }),
});

const updateServiceSchema = Joi.object({
  service_id: Joi.string().required().messages({
    "string.empty": "Service ID is don't empty field",
    "any.required": "Service ID is required",
  }),
  event_manage_id: Joi.string().optional().messages({
    "string.empty": "Event ID is don't empty field",
  }),
  service_name: Joi.string().optional().messages({
    "string.empty": "Service name is don't empty field",
  }),
  service_description: Joi.string().optional().messages({
    "string.empty": "Service description is don't empty field",
  }),
  price: Joi.number().optional().messages({
    "number.empty": "Price is don't empty field",
  }),
});

const listServiceSchema = Joi.object({
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
    .valid("service_name", "price")
    .optional()
    .default("service_name")
    .messages({
      "any.only": "Sort by must be one of: service_name, price",
    }),
});

module.exports = {
  serviceSchema,
  updateServiceSchema,
  listServiceSchema,
};

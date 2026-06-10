const Joi = require("joi");

const eventSchema = Joi.object({
  user_id: Joi.string().required().messages({
    "string.empty": "User ID is don't empty field",
    "any.required": "User ID is required",
  }),
  event_name: Joi.string().required().messages({
    "string.empty": "Event name is don't empty field",
    "any.required": "Event name is required",
  }),
  event_description: Joi.string().required().messages({
    "string.empty": "Event description is don't empty field",
    "any.required": "Event description is required",
  }),
});

const updateEventSchema = Joi.object({
  event_id: Joi.string().required().messages({
    "string.empty": "Event ID is don't empty field",
    "any.required": "Event ID is required",
  }),
  event_name: Joi.string().optional().messages({
    "string.empty": "Event name is don't empty field",
  }),
  event_description: Joi.string().optional().messages({
    "string.empty": "Event description is don't empty field",
  }),
});

const listEventSchema = Joi.object({
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
});

module.exports = {
  eventSchema,
  updateEventSchema,
  listEventSchema,
};

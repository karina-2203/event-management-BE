const Joi = require("joi");

const bookingSchema = Joi.object({
  address_id: Joi.string().required().messages({
    "string.base": "Address ID must be a string",
    "string.empty": "Address ID cannot be empty",
    "any.required": "Address ID is required",
  }),

  event_manage_id: Joi.string().required().messages({
    "string.base": "Event Manage ID must be a string",
    "string.empty": "Event Manage ID cannot be empty",
    "any.required": "Event Manage ID is required",
  }),

  event_date: Joi.string().required().messages({
    "string.base": "Event Date must be a string",
    "string.empty": "Event Date cannot be empty",
    "any.required": "Event Date is required",
  }),

  additional_information: Joi.string().required().messages({
    "string.base": "Additional Information must be a string",
    "string.empty": "Additional Information cannot be empty",
    "any.required": "Additional Information is required",
  }),

  status: Joi.string().optional().messages({
    "string.base": "Status must be a string",
  }),
});

const updateBookingSchema = Joi.object({
  booking_id: Joi.string().required().messages({
    "string.base": "Booking ID must be a string",
    "string.empty": "Booking ID cannot be empty",
    "any.required": "Booking ID is required",
  }),

  address_id: Joi.string().optional().messages({
    "string.base": "Address ID must be a string",
    "string.empty": "Address ID cannot be empty",
  }),

  event_manage_id: Joi.string().optional().messages({
    "string.base": "Event Manage ID must be a string",
    "string.empty": "Event Manage ID cannot be empty",
  }),

  event_date: Joi.string().optional().messages({
    "string.base": "Event Date must be a string",
    "string.empty": "Event Date cannot be empty",
  }),

  additional_information: Joi.string().optional().messages({
    "string.base": "Additional Information must be a string",
    "string.empty": "Additional Information cannot be empty",
  }),

  status: Joi.string().optional().messages({
    "string.base": "Status must be a string",
  }),
});

const listBookingSchema = Joi.object({
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
    .valid("event_date", "status", "createdAt", "updatedAt")
    .optional()
    .default("createdAt")
    .messages({
      "any.only":
        "Sort by must be one of: event_date, status, createdAt, updatedAt",
    }),
});

module.exports = {
  bookingSchema,
  updateBookingSchema,
  listBookingSchema,
};

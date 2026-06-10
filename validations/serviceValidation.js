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
  event_manage_id: Joi.string().required().messages({
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

module.exports = {
  eventSchema,
  updateEventSchema,
};

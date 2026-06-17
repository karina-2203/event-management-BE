const Joi = require("joi");

const reportSchema = Joi.object({
  event_date: Joi.string().required().messages({
    "string.base": "Event Date must be a string",
    "string.empty": "Event Date cannot be empty",
    "any.required": "Event Date is required",
  }),
});

module.exports = {
  reportSchema,
};

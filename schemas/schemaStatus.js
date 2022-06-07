const Joi = require("joi");

const joiStatusSchema = Joi.object({
    favorite: Joi.boolean().required(),
  })

module.exports = joiStatusSchema;
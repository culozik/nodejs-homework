const Joi = require('joi');

const joiSchema = Joi.object({
  name: Joi.string()
    .pattern(/[a-z]+$/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/[0-9()-]+$/)
    .required(),
  favorite: Joi.boolean(),
});

module.exports = joiSchema;

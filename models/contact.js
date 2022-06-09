const { Schema, model } = require('mongoose');
const Joi = require('joi');
const CODE_REGEXP = {
  NAME: /[a-z]+$/,
  PHONE: /[0-9()-]+$/,
};

const contactSchema = Schema(
  {
    name: {
      type: String,
      match: CODE_REGEXP.NAME,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      match: CODE_REGEXP.PHONE,
      required: true,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const joiAddSchema = Joi.object({
  name: Joi.string().pattern(CODE_REGEXP.NAME).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(CODE_REGEXP.PHONE).required(),
  favorite: Joi.boolean(),
});

const joiPutSchema = Joi.object({
  name: Joi.string().pattern(CODE_REGEXP.NAME),
  email: Joi.string().email(),
  phone: Joi.string().pattern(CODE_REGEXP.PHONE),
  favorite: Joi.boolean(),
});

const joiStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  joiSchema: {
    add: joiAddSchema,
    update: joiPutSchema,
    statusUpdate: joiStatusSchema,
  },
};

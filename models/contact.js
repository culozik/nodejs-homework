const { Schema, model } = require('mongoose');
const Joi = require('joi');
const CODE_REGEXP = {
  NAME: /[a-z]+$/,
  EMAIL: /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/,
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
      match: CODE_REGEXP.EMAIL,
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false }
);

const joiAddSchema = Joi.object({
  name: Joi.string().pattern(CODE_REGEXP.NAME).required(),
  email: Joi.string().pattern(CODE_REGEXP.EMAIL).required(),
  phone: Joi.string().pattern(CODE_REGEXP.PHONE).required(),
  favorite: Joi.boolean(),
});

const joiPutSchema = Joi.object({
  name: Joi.string().pattern(CODE_REGEXP.NAME),
  email: Joi.string().pattern(CODE_REGEXP.EMAIL),
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
  CODE_REGEXP,
};

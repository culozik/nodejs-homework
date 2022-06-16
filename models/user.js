const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { CODE_REGEXP } = require('./contact');

const userSchema = Schema(
  {
    password: {
      type: String,
      minlength: [6, 'Password must be 6 or more characters'],
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: CODE_REGEXP.EMAIL,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

const joiRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(CODE_REGEXP.EMAIL).required(),
  subscription: Joi.string(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(CODE_REGEXP.EMAIL).required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiSchema: {
    register: joiRegisterSchema,
    login: joiLoginSchema,
  },
};

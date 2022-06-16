const express = require('express');
const { validationBody } = require('../../middlewares');
const { users: ctrl } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');

const { joiSchema } = require('../../models/user');

const router = express.Router();

router.post(
  '/signup',
  validationBody(joiSchema.register),
  ctrlWrapper(ctrl.addUser)
);

router.post(
  '/login',
  validationBody(joiSchema.register),
  ctrlWrapper(ctrl.login)
);

module.exports = router;

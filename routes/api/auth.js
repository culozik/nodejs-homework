const express = require('express');
// const createError = require('http-errors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const { validationBody } = require('../../middlewares');
const { users: ctrl } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');

const { joiSchema } = require('../../models/user');

const router = express.Router();

router.post(
  '/register',
  validationBody(joiSchema.register),
  ctrlWrapper(ctrl.addUser)
);

router.post('/login');

module.exports = router;

const express = require('express');
const { validationBody, authenticate, upload } = require('../../middlewares');
const { auth: ctrl, users: ctrlUsers } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');

const { joiSchema } = require('../../models/user');

const router = express.Router();

router.post(
  '/signup',
  validationBody(joiSchema.register),
  ctrlWrapper(ctrl.register)
);

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

router.post(
  '/verify',
  validationBody(joiSchema.verifyEmail),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.post(
  '/login',
  validationBody(joiSchema.register),
  ctrlWrapper(ctrl.login)
);

router.get('/current', authenticate, ctrlWrapper(ctrlUsers.current));

router.get('/logout', authenticate, ctrlWrapper(ctrlUsers.logout));

router.patch(
  '/',
  authenticate,
  validationBody(joiSchema.subscription),
  ctrlWrapper(ctrlUsers.updateSubscription)
);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(ctrlUsers.setAvatar)
);

module.exports = router;

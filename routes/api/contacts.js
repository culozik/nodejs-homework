const express = require('express');

const { contacts: ctrl } = require('../../controllers');
const { ctrlWrapper, MESSAGE } = require('../../helpers');
const {
  validationBody,
  validationBodyLength,
  authenticate,
  isValidId,
} = require('../../middlewares');
const { joiSchema } = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  '/',
  authenticate,
  validationBody(joiSchema.add),
  ctrlWrapper(ctrl.addContact)
);

router.delete(
  '/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.removeById)
);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validationBodyLength(MESSAGE.NO_FIELDS),
  validationBody(joiSchema.update),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validationBodyLength(MESSAGE.NO_FAVORITE),
  validationBody(joiSchema.statusUpdate),
  ctrlWrapper(ctrl.updateStatusById)
);

module.exports = router;

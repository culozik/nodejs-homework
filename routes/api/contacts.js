const express = require('express');

const { contacts: ctrl } = require('../../controllers');
const { ctrlWrapper, MESSAGE } = require('../../helpers');
const { validationBody, validationBodyLength } = require('../../middlewares');
const { joiSchema } = require('../../models');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validationBody(joiSchema.add), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put(
  '/:contactId',
  validationBodyLength(MESSAGE.NO_FIELDS),
  validationBody(joiSchema.update),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId/favorite',
  validationBodyLength(MESSAGE.NO_FAVORITE),
  validationBody(joiSchema.statusUpdate),
  ctrlWrapper(ctrl.updateStatusById)
);

module.exports = router;

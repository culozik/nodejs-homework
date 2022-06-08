const express = require('express');

const { contacts: ctrl } = require('../../controllers');
const { ctrlWrapper, MESSAGE } = require('../../helpers');
const { validationBody, validationBodyLength } = require('../../middlewares');
const { schemaBody, schemaPut, schemaStatus } = require('../../schemas');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validationBody(schemaBody), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put(
  '/:contactId',
  validationBodyLength(MESSAGE.NO_FIELDS),
  validationBody(schemaPut),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId/favorite',
  validationBodyLength(MESSAGE.NO_FAVORITE),
  validationBody(schemaStatus),
  ctrlWrapper(ctrl.updateStatusById)
);

module.exports = router;

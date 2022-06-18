const { isValidObjectId } = require('mongoose');

const { createError, MESSAGE } = require('../helpers');

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = createError(400, MESSAGE.ID);
    next(error);
    return;
  }
  next();
};

module.exports = isValidId;

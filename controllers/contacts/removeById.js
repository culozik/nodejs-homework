const { Contact } = require('../../models/contact');
const { createError, MESSAGE } = require('../../helpers');

const removeById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw createError(404);
  }
  res.json({ message: MESSAGE.DELETED });
};

module.exports = removeById;

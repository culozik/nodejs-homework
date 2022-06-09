const { Contact } = require('../../models/contact');
const { createError } = require('../../helpers');

const updateById = async ({ body, params }, res, next) => {
  const { contactId } = params;
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateById;

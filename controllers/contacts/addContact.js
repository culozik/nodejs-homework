const { Contact } = require('../../models/contact');

const addContact = async ({ body }, res, next) => {
  const result = await Contact.create(body);
  res.status(201).json(result);
};

module.exports = addContact;

const { Contact } = require('../../models/contact');

const addContact = async (req, res, next) => {
  const data = { ...req.body, owner: req.user._id };
  const result = await Contact.create(data);
  res.status(201).json(result);
};

module.exports = addContact;

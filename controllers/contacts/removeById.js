const Contact = require("../../models/contact");
const { createError } = require("../../helpers");
const {TYPE} = require("../../helpers")

const removeById = async ({params}, res, next) => {
      const { contactId } = params;
      const result = await Contact.findByIdAndDelete(contactId);
      if (!result) {
        throw createError(404);
      }
      res.json({ message: TYPE.DELETED });
   
  }

  module.exports = removeById;
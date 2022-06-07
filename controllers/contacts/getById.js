const Contact = require("../../models/contact")
const { createError } = require("../../helpers");

const getById =  async ({params}, res, next) => {
      const { contactId } = params;
      const result = await Contact.findById(contactId);
      if (!result) {
        throw createError(404);
      }
      res.json(result);
   
};

module.exports = getById;
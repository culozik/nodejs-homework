const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const { favorite = false } = req.query;
  const { _id } = req.user;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    favorite ? { owner: _id, favorite } : { owner: _id },
    '-owner',
    {
      skip,
      limit: +limit,
    }
  );
  res.json(result);
};

module.exports = getAll;

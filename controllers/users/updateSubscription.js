const { User } = require('../../models/user');
const { createError } = require('../../helpers');

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true,
    select: 'subscription',
  });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateSubscription;

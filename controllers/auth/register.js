const bcrypt = require('bcryptjs');

const { User } = require('../../models/user');
const { createError, MESSAGE } = require('../../helpers');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, MESSAGE.USER_EMAIL);
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const result = await User.create({ email, password: hashPassword });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = register;
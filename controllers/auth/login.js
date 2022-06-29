const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');
const { createError, MESSAGE } = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, MESSAGE.LOGIN);
  }

  if (!user.verify) {
    throw createError(401, MESSAGE.EMAIL_VERIFICATION);
  }

  const compareResult = await bcrypt.compare(password, user.password);

  if (!compareResult) {
    throw createError(401, MESSAGE.LOGIN);
  }

  const subscription = user.subscription;

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = login;

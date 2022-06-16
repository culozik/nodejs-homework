const bcrypt = require('bcryptjs');

const { User } = require('../../models/user');

const addUser = async (req, res, next) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  await User.create({ email, password: hashPassword });
  res.status(201).json({
    user: {
      email: 'example@example.com',
      subscription: 'starter',
    },
  });
};

module.exports = addUser;

const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const { User } = require('../../models/user');
const { createError, MESSAGE, sendMail } = require('../../helpers');
const { PORT = 3000 } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, MESSAGE.USER_EMAIL);
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const result = await User.create({
    email,
    avatarURL,
    password: hashPassword,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `<a target="_blank" href=http://localhost:${PORT}/auth/verify/${verificationToken}">Нажмите для подтверждения регистрации</a>`,
  };
  await sendMail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = register;

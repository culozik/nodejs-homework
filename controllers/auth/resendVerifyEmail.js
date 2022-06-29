const { User } = require('../../models/user');
const { createError, sendMail, MESSAGE } = require('../../helpers');

const { SITE_URL } = process.env;

const EMAIL_SENT = 'Verification email sent';

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404);
  }
  if (user.verify) {
    throw createError(400, MESSAGE.VERIFICATION_PASSED);
  }
  const { verificationToken } = user;
  const mail = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `<a target="_blank" href="${SITE_URL}/auth/verify/${verificationToken}">Нажмите для подтверждения регистрации</a>`,
  };
  await sendMail(mail);
  res.json({
    message: EMAIL_SENT,
  });
};

module.exports = resendVerifyEmail;

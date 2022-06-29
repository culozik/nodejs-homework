const nodemailer = require('nodemailer');
require('dotenv').config();

const createError = require('http-errors');

const { META_EMAIL, META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
};

const smtpTransport = nodemailer.createTransport(nodemailerConfig);

const sendMail = async data => {
  try {
    const mail = { ...data, from: META_EMAIL };
    await smtpTransport.sendMail(mail);
    return true;
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = sendMail;

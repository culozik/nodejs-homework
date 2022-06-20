const jwt = require('jsonwebtoken');

const { User } = require('../models/user');
const { createError, MESSAGE } = require('../helpers');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      createError(401, MESSAGE.AUTH);
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw createError(401, MESSAGE.AUTH);
    }

    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = MESSAGE.AUTH;
    }
    next(error);
  }
};

module.exports = authenticate;

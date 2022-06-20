const { MESSAGE, ERROR_TYPE } = require('./messageTypes');

const messages = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
};

const createError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const validationError = error => {
  if (error.message.includes(ERROR_TYPE.EMAIL)) {
    error.status = 400;
    error.message = MESSAGE.EMAIL;
    return;
  }
  if (error.message.includes(ERROR_TYPE.PHONE)) {
    error.status = 400;
    error.message = MESSAGE.PHONE;
    return;
  }
  if (error.message.includes(ERROR_TYPE.SUBSCRIPTION)) {
    error.status = 400;
    error.message = MESSAGE.WRONG_SUBSCRIPTION;
    return;
  }
  if (error.message.includes(ERROR_TYPE.USER_EMAIL)) {
    error.status = 409;
    error.message = MESSAGE.USER_EMAIL;
  }
};

module.exports = { createError, validationError };

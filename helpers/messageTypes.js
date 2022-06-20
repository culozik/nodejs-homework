const MESSAGE = {
  MISSING: 'Missing required name field.',
  DELETED: 'Contact deleted.',
  NO_FIELDS: 'Missing fields.',
  NO_FAVORITE: 'Missing field favorite.',
  STATUS_TYPE_ERROR: "Field 'favorite' must be a boolean.",
  EMAIL: 'Email is already in contact list.',
  USER_EMAIL: 'Email in use.',
  PHONE: 'Phone number is already in contact list.',
  LOGIN: 'Email or password is wrong.',
  AUTH: 'Not authorized.',
  MISSING_CONTACT: 'No such contact.',
  WRONG_SUBSCRIPTION: 'Wrong type of subscription.',
  ID: 'Not id.',
};

const ERROR_TYPE = {
  EMAIL:
    'E11000 duplicate key error collection: db-contacts.contacts index: code_email-owner',
  PHONE:
    'E11000 duplicate key error collection: db-contacts.contacts index: code_number-owner',
  USER_EMAIL:
    'E11000 duplicate key error collection: db-contacts.users index: email_1',
  SUBSCRIPTION: 'Validation failed: subscription:',
};

module.exports = { MESSAGE, ERROR_TYPE };

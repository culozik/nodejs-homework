const MESSAGE = {
  MISSING: 'missing required name field',
  DELETED: 'contact deleted',
  NO_FIELDS: 'missing fields',
  NO_FAVORITE: 'missing field favorite',
  STATUS_TYPE_ERROR: "Field 'favorite' must be a boolean",
  EMAIL: 'Email is already in contact list',
  PHONE: 'Phone number is already in contact list',
};

const ERROR_TYPE = {
  EMAIL:
    'E11000 duplicate key error collection: db-contacts.contacts index: code_1',
  PHONE:
    'E11000 duplicate key error collection: db-contacts.contacts index: code_phone',
};

module.exports = { MESSAGE, ERROR_TYPE };

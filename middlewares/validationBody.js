const {createError, TYPE} = require("../helpers");

const validationBody = (schema) => {
    const func = (req, res, next) => {
        try {
            const { error } = schema.validate(req.body);
            if (error) {
                throw createError(400, TYPE.MISSING);
            }
            next();
        } catch (error) {
            next(error);
        }
    }

    return func;
}

module.exports = validationBody;
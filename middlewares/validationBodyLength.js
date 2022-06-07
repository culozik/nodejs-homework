const {createError} = require("../helpers");

const validationBodyLength = (message) => {
    const func = ({body}, res, next) => {
        try {
            if(!Object.keys(body).length) {
                throw createError(400, message);
            }
            next();
        } catch (error) {
            next(error);
        }
    }
    return func;
}

module.exports = validationBodyLength;
const express = require("express");
const Joi = require("joi");

const Contact = require("../../models/contact");
const { createError } = require("../../helpers");

const router = express.Router();

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const joiPutSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean()
});

const joiStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const TYPE = {
  MISSING: "missing required name field",
  DELETED: "contact deleted",
  NO_FIELDS: "missing fields",
  NO_FAVORITE: "missing field favorite",
  STATUS_TYPE_ERROR: "Field 'favorite' must be a boolean",
}

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async ({params}, res, next) => {
  try {
    const { contactId } = params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  } 
});

router.post("/", async ({body}, res, next) => { 
  try {
    const { error } = joiSchema.validate(body);
    if (error) {
      throw createError(400, TYPE.MISSING);
    }
    const result = await Contact.create(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async ({params}, res, next) => {
  try {
    const { contactId } = params;
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
      throw createError(404);
    }
    res.json({ message: TYPE.DELETED });
  } catch (error) {
    next(error)
  }
});

router.put("/:contactId", async ({body, params}, res, next) => {
  try {
    if(!Object.keys(body).length) {
      throw createError(400, TYPE.NO_FIELDS);
    }
    const { error } = joiPutSchema.validate(body);
    if (error) {
      throw createError(400, TYPE.MISSING);
    }
    const { contactId } = params;
    const result = await Contact.findByIdAndUpdate(contactId, body, {new: true});
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async ({body, params}, res, next) => {
  try {
    if(!Object.keys(body).length) {
      throw createError(400, TYPE.NO_FAVORITE);
    }

    const { error } = joiStatusSchema.validate(body);
    if (error) {
      throw createError(400, TYPE.STATUS_TYPE_ERROR);
    }

    const { contactId } = params;
    const result = await Contact.findByIdAndUpdate(contactId, body, {new: true});
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error)
  }
})

module.exports = router;
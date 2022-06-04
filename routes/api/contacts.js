const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");
const { createError } = require("../../helpers");

const router = express.Router();

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const joiPutSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const TYPE = {
  MISSING: "missing required name field",
  DELETED: "contact deleted",
  NO_FIELDS: "missing fields"
}

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async ({params}, res, next) => {
  try {
    const { contactId } = params;
    const result = await contacts.getContactById(contactId);
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
    const result = await contacts.addContact(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async ({params}, res, next) => {
  try {
    const { contactId } = params;
    const result = await contacts.removeContact(contactId);

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
    const result = await contacts.updateContact(contactId, body);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
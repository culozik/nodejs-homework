const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const res = contacts.find(({ id }) => id === contactId.toString());
  if (!res) {
    return null;
  }
  return res;
};

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId.toString());
  if (index === -1) {
    return null;
  }
  const [res] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return res;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId.toString());
  if (index === -1) {
    return null;
  }
  contacts[index] = {...contacts[index], ...body };
  updateContacts(contacts);
  return contacts[index];

};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  console.table(parsedData);
}

async function getContactsById(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  const contactById = parsedData.find((contact) => contact.id === contactId);
  console.table(contactById);
  return contactById;
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  const newData = parsedData.filter(
    (contact) => Number(contact.id) !== contactId
  );
  console.table(newData);
  const jsonNewData = JSON.stringify(newData);
  fs.writeFile(contactsPath, jsonNewData);
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  const lastId = Number(parsedData[parsedData.length - 1].id);
  const id = String(lastId + 1);
  parsedData.push({ id, name, email, phone });
  console.table(parsedData);
  const jsonNewData = JSON.stringify(parsedData);
  fs.writeFile(contactsPath, jsonNewData);
}

module.exports = { listContacts, getContactsById, removeContact, addContact };

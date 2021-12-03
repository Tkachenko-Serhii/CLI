const shortid = require("shortid");
const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contactsArr = JSON.parse(contacts);
    console.table(contactsArr);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contactsArr = JSON.parse(contacts);
    const id = parseInt(contactId);
    contactsArr.map((contact) => {
      if (contact.id === id) {
        return console.table(contact);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contactsArr = JSON.parse(contacts);
    const id = parseInt(contactId);
    const newArr = [];
    contactsArr.map((contact) => {
      if (contact.id !== id) {
        newArr.push(contact);
      }
    });
    console.table(newArr);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contactsArr = JSON.parse(contacts);
    const newContact = {
      id: shortid(),
      name,
      email,
      phone,
    };
    contactsArr.push(newContact);
    console.table(contactsArr);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

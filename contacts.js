const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

async function getContactsList() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contactsArr = JSON.parse(contacts);
    return contactsArr;
  } catch (error) {
    console.log(error);
  }
}

async function listContacts() {
  try {
    const contactsArr = await getContactsList();
    console.table(contactsArr);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contactsArr = await getContactsList();

    contactsArr.map((contact) => {
      if (contact.id === contactId) {
        console.table(contact);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactsArr = await getContactsList();
    let newContactsArr = [];

    contactsArr.map((contact) => {
      if (contact.id !== contactId) {
        newContactsArr.push(contact);
      }
    });
    const newContactsList = JSON.stringify(newContactsArr);
    await fs.writeFile(contactsPath, newContactsList, "utf8");
    console.table(newContactsArr);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsArr = await getContactsList();
    let newContactsArr = [];
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    newContactsArr.push(...contactsArr, newContact);
    const newContactsList = JSON.stringify(newContactsArr);
    await fs.writeFile(contactsPath, newContactsList, "utf8");
    console.table(await getContactsList());
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

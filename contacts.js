const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

async function getContactsList() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contactsArr = JSON.parse(contacts);

    function findError() {
      if (contactsArr.length !== 0) {
        return contactsArr;
      }
      return console.log("Sorry, but you contacts list is empty");
    }
    return findError();
  } catch (error) {
    console.log(error);
  }
}

async function getContact(contactId) {
  try {
    const contactsArr = await getContactsList();

    const foundСontact = contactsArr.find((contact) => {
      if (contact.id === contactId) {
        return contact;
      }
    });

    if (foundСontact) {
      return foundСontact;
    }
    return console.log(
      `Sorry, but you contacts list dosn't have contact with id ${contactId}.`
    );
  } catch (error) {
    console.log(error);
  }
}

async function listContacts() {
  try {
    const contactsArr = await getContactsList();
    if (contactsArr) {
      console.table(contactsArr);
    }
    return;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contact = await getContact(contactId);
    if (contact) {
      console.table(contact);
    }
    return;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const foundContact = await getContact(contactId);

    if (foundContact) {
      let newContactsArr = [];
      const contactsArr = await getContactsList();

      contactsArr.map((contact) => {
        if (contact.id !== foundContact.id) {
          newContactsArr.push(contact);
        }
      });
      const newContactsList = JSON.stringify(newContactsArr);
      await fs.writeFile(contactsPath, newContactsList, "utf8");
      console.table(newContactsArr);
    }

    return;
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
    const newContactsList = JSON.stringify(newContactsArr, null, 2);
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

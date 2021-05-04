import { fdatasync } from "fs";
import path from "path";
//import fs, { fdatasync } from "fs";
import uniqid from "uniqid";
import { promises as fs } from "fs";

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const contactsJson = await fs.readFile(contactsPath, "utf-8");
    const parsedContactsList = await JSON.parse(contactsJson);
    return console.table(parsedContactsList);
  } catch (err) {
    console.error(err);
  }

  await fs
    .readFile(contactsPath, "utf-8")
    .then((contactsJson) => console.table(JSON.parse(contactsJson)))
    .catch((err) => console.error(err));
}

async function getContactById(contactId) {
  try {
    const contactsJson = await fs.readFile(contactsPath, "utf-8");
    const parsedContactsList = await JSON.parse(contactsJson);
    const foundContact = await parsedContactsList.find(
      (contact) => String(contact.id) === String(contactId)
    );
    if (!foundContact) {
      console.log("contact not found");
      return;
    }
    return console.log(foundContact);
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const contactsJson = await fs.readFile(contactsPath, "utf-8");
    const parsedContactsList = await JSON.parse(contactsJson);
    const checkedContactById = await parsedContactsList.find(
      (contact) => String(contact.id) === String(contactId)
    );

    if (!checkedContactById) {
      console.log("This contact isn't in the list");
      return;
    }
    const updatedContactsList = await parsedContactsList.filter(
      (contact) => String(contact.id) !== String(contactId)
    );
    if (parsedContactsList !== updatedContactsList) {
      console.log("i am in");
      const newData = JSON.stringify(updatedContactsList);
      await fs.writeFile(contactsPath, newData);
      console.log("Contact has been successfully deleted");
      listContacts();
    }
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsJson = await fs.readFile(contactsPath, "utf-8");
    const parsedContactList = await JSON.parse(contactsJson);

    if (!name || !email || !phone) {
      console.log("the data is not full");
      return;
    }

    const newContact = {
      id: uniqid(),
      name,
      email,
      phone,
    };

    parsedContactList.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(parsedContactList));
    console.log("contact was succesful added");
    listContacts();
  } catch (err) {
    (err) => console.error(err);
  }
}

export const fn = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

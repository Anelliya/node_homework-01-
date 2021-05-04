import path from "path";
import fs, { fdatasync } from "fs";
import uniqid from "uniqid";
// import { promises as fs } from "fs";

const contactsPath = path.join("db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log("err:", err);
      return;
    }
    const parsedContactsList = JSON.parse(data);
    return console.table(parsedContactsList);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    const parsedContactsList = JSON.parse(data);
    const foundContact = parsedContactsList.find(
      (contact) => String(contact.id) === String(contactId)
    );
    if (!foundContact) {
      console.log("contact not found");
      return;
    }
    return console.log(foundContact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    const parsedContactsList = JSON.parse(data);
    const checkedContactById = parsedContactsList.find(
      (contact) => String(contact.id) === String(contactId)
    );

    console.log(checkedContactById);
    if (!checkedContactById) {
      console.log("This contact isn't in the list");
      return;
    }

    const updatedContactsList = parsedContactsList.filter(
      (contact) => String(contact.id) !== String(contactId)
    );

    if (parsedContactsList !== updatedContactsList) {
      const newData = JSON.stringify(updatedContactsList);

      fs.writeFile(contactsPath, newData, (err) => {
        console.log("Contact has been successfully deleted");
        listContacts();

        if (err) {
          console.log(err.message);
          return;
        }
      });
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const parsedContactList = JSON.parse(data);

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

    fs.writeFile(contactsPath, JSON.stringify(parsedContactList), (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("contact was succesful added");
      listContacts();
    });
  });
}

export const fn = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

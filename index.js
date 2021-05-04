import { fn } from "./contacts.js";
import { Command } from "commander/esm.mjs";
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      fn.listContacts();
      break;

    case "get":
      fn.getContactById(id);
      break;

    case "add":
      fn.addContact(name, email, phone);
      break;

    case "remove":
      fn.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

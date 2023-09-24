const contacts = require("./contacts");
const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contactList = await contacts.listContacts();
        return console.lognode(contactList);

      case "getById":
        const oneContact = await contacts.getContactById(id);
        return console.log(oneContact);

      case "add":
        const NewContact = await contacts.addContact({ name, phone, email });
        return console.log(NewContact);

      case "remove":
        const deleteContact = await contacts.removeContact(id);
        return console.log(deleteContact);

      default:
        console.log("Unknown action");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

invokeAction(options);

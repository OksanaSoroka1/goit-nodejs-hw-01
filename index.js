const { program } = require('commander');
const {listContacts, getContactById, removeContact, addContact } = require('./contacts.js')

program
  .option('-a, --action <type>', "contact operation")
  .option('-i, --id <type>', "contact id")
  .option('-n, --name <type>', "contact name")
  .option('-e, --email <type>', "contact email")
  .option('-p, --phone <type>', "contact phone")

program.parse(process.argv);
const options = program.opts();


const invokeAction = async ({ action, id, name, email, phone} ) => {
  switch (action) {
    case "list":
     const contacts = await listContacts()
      console.log(contacts)
      break;

    case "get":
      const contactById = await getContactById(id);
      if (!contactById) {throw new Error(`Contact with id = ${id} not found `) }
     console.log(contactById)
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact)
      break;

    case "remove":
      const removedContact = await removeContact(id)
      console.log(removedContact)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);
 
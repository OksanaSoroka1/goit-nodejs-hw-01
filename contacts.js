const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json')



// TODO: задокументировать каждую функцию
async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const list = JSON.parse(data)
    return list
}

async function getContactById(contactId) {
    const list = await listContacts();
    const contactById = list.find(item => item.id === contactId)
    if (!contactById) {return null }
    return contactById
}

function updateContactsList(list) {
    fs.writeFile(contactsPath, JSON.stringify(list))
}
 
async function addContact(name, email, phone) {
    const contacts = await listContacts()
    const newContact = { name: name, email: email, phone: phone, id: nanoid() }
    contacts.push(newContact)
    await updateContactsList(contacts)
    return newContact
}


async function removeContact(contactId) {
    const contacts = await listContacts()
    const contactIndex = contacts.findIndex(contact => contact.id === contactId)
    if (contactIndex === -1) {
        return null
    }
    const newContacts = contacts.filter((contact, index) =>  index !== contactIndex)
   
    await updateContactsList(newContacts)
    return contacts[contactIndex]
}



module.exports = {listContacts, getContactById, removeContact, addContact}
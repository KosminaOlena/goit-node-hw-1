const fs = require('node:fs/promises');
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
  }
  
async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    return contact || null;
  }

  async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  }
  
async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    const [deletedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return deletedContact;
  }
  
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }
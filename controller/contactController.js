
import fs from "fs";

export const addContactController=(req,res)=>{
const contactsData = JSON.parse(fs.readFileSync('./data/contacts.json'));

const newContact = req.body;

  newContact.id = Date.now();
  newContact.createdDate = new Date().toISOString();
  contactsData.push(newContact);
  fs.writeFileSync('./data/contacts.json', JSON.stringify(contactsData, null, 2));

  res.json(newContact);
}

export const getContactController=(req,res)=>{
    const contactsData = JSON.parse(fs.readFileSync('./data/contacts.json'));
    res.json(contactsData)

}


export const updateContactController=(req,res)=>{
const contactsData = JSON.parse(fs.readFileSync('./data/contacts.json'));

    const contactId = req.body.id;
    console.log(contactId)
    const updatedContact = req.body;
    const existingContact = contactsData.find((c) => c.id === contactId);
  
    if (!existingContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
  
    Object.assign(existingContact, updatedContact);
  
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contactsData, null, 2));
  
    res.json(existingContact);
  
}


export const deleteContactController =(req,res)=>{

const contactsData = JSON.parse(fs.readFileSync('./data/contacts.json'));

    const contactId = parseInt(req.params.id);
    const contactIndex = contactsData.findIndex((c) => c.id === contactId);

  if (contactIndex === -1) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  console.log("contact index is",contactIndex)

  const deletedContact = contactsData.splice(contactIndex, 1)[0];

  fs.writeFileSync('./data/contacts.json', JSON.stringify(contactsData, null, 2));

  res.json(deletedContact);

}
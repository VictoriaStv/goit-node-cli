import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact || null;
};


export const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
};

export const updateContact = async (contactId, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { ...contacts[index], ...data };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

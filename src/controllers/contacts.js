import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  upsertContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    data: contacts,
    message: 'Successfully found contacts!',
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }
  res.status(200).json({
    status: 200,
    data: contact,
    message: `Successfully found contact with id ${contactId}!`,
  });
};

export const createContactController = async (req, res, next) => {
  if (!req.body.name || !req.body.phoneNumber) {
    next(createHttpError(400, 'Name and phone number are required!'));
    return;
  }
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    data: contact,
    message: 'Successfully created contact!',
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }
  res.status(204).send();
};
export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await upsertContact(contactId, req.body);
  if (!result) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }
  res.status(200).json({
    status: 200,
    data: result.contact,
    message: 'Successfully patched contact!',
  });
};

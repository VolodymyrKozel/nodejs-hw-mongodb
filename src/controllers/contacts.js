import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  upsertContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const contacts = await getAllContacts({
    userId: req.user._id,
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    data: contacts,
    message: `${
      contacts.data.length === 0
        ? 'No contacts found!'
        : 'Successfully found contacts!'
    }`,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);
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
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const contact = await createContact(
    { ...req.body, photo: photoUrl },
    req.user._id,
  );
  res.status(201).json({
    status: 201,
    data: contact,
    message: 'Successfully created contact!',
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);
  if (!contact) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }
  res.status(204).send();
};
export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const result = await upsertContact(
    { contactId, userId: req.user._id },
    { ...req.body, photo: photoUrl },
  );
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

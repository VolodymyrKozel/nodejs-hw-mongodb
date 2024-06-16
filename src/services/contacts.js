import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find();
  if (filter.type) {
    contactsQuery.where({ contactType: filter.type });
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (userId) {
    contactsQuery.where({ userId: userId });
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};
export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({
    _id: contactId,
    userId: userId,
  });
  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await ContactsCollection.create({
    ...payload,
    userId: userId,
  });
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findByIdAndDelete({
    userId: userId,
    _id: contactId,
  });
  return contact;
};

export const upsertContact = async (ids, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: ids.contactId, userId: ids.userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) {
    return null;
  }
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

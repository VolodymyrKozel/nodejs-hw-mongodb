import { CONTACT_TYPES_ARRAY } from '../constants/index.js';
const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => CONTACT_TYPES_ARRAY.includes(type);
  if (isType(type)) return type;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  return {
    type: parsedType,
    isFavourite,
  };
};

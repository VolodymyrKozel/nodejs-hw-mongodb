import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a type of string!',
    'string.min': 'Name must be at least {#limit} characters long!',
    'string.max': 'Name must be no more than {#limit} characters long!',
    'any.required': 'Name is required!',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a type of string!',
    'string.email': 'Email must be a valid email!',
    'any.required': 'Email is required!',
  }),
  password: Joi.string()
    .min(8)
    .max(20)
    .alphanum()
    .uppercase()
    .lowercase()
    .required()
    .messages({
      'string.base': 'Password must be a type of string!',
      'string.min': 'Password must be at least {#limit} characters long!',
      'string.max': 'Password must be no more than {#limit} characters long!',
      'any.required': 'Password is required!',
      'string.alphanum': 'Password must contain letters and numbers!',
      'string.uppercase':
        'Password must contain at least one uppercase letter!',
      'string.lowercase':
        'Password must contain at least one lowercase letter!',
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a type of string!',
    'string.email': 'Email must be a valid email!',
    'any.required': 'Email is required!',
  }),
  password: Joi.string()
    .min(8)
    .max(20)
    .alphanum()
    .uppercase()
    .lowercase()
    .required()
    .messages({
      'string.base': 'Password must be a type of string!',
      'string.min': 'Password must be at least {#limit} characters long!',
      'string.max': 'Password must be no more than {#limit} characters long!',
      'any.required': 'Password is required!',
      'string.alphanum': 'Password must contain letters and numbers!',
      'string.uppercase':
        'Password must contain at least one uppercase letter!',
      'string.lowercase':
        'Password must contain at least one lowercase letter!',
    }),
});

export const requestResetByEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a type of string!',
    'string.email': 'Email must be a valid email!',
    'any.required': 'Email is required!',
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(20)
    .alphanum()
    .uppercase()
    .lowercase()
    .required()
    .messages({
      'string.base': 'Password must be a type of string!',
      'string.min': 'Password must be at least {#limit} characters long!',
      'string.max': 'Password must be no more than {#limit} characters long!',
      'any.required': 'Password is required!',
      'string.alphanum': 'Password must contain letters and numbers!',
      'string.uppercase':
        'Password must contain at least one uppercase letter!',
      'string.lowercase':
        'Password must contain at least one lowercase letter!',
    }),
  token: Joi.string().required().messages({
    'any.required': 'Token is required!',
  }),
});

export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});

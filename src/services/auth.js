import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY, TEMPLATES_DIR } from '../constants/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SMTP } from '../constants/index.js';
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendMail.js';
import createHttpError from 'http-errors';

import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) {
    throw createHttpError(409, 'Email in use!');
  }
  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  console.log(user);
  if (!user) {
    throw createHttpError(401, 'Unauthorized!');
  }

  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) {
    throw createHttpError(401, 'Unauthorized!');
  }
  // видалити попередні сесії які були створені користувачем з бази даних
  await SessionsCollection.deleteMany({ userId: user._id });
  const createdSession = createSession();
  return await SessionsCollection.create({
    userId: user._id,
    ...createdSession,
  });
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }
  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session expired!');
  }

  await SessionsCollection.deleteOne({ _id: sessionId });

  const newSession = createSession();

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

export const requestResetToken = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }
  //create token
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email: payload.email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: `${FIFTEEN_MINUTES}ms`,
    },
  );
  console.log(`${FIFTEEN_MINUTES}m`);

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });
  //send email
  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: user.email,
    subject: 'Reset your password',
    html,
  });
  return user;
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = await jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (e) {
    if (e instanceof Error) throw createHttpError(401, e.message);
    throw e;
  }

  const user = await UsersCollection.findOne({
    _id: entries.sub,
    email: entries.email,
  });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  return await UsersCollection.findOneAndUpdate(
    { _id: entries.sub },
    { password: encryptedPassword },
  );
};

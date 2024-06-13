import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SMTP } from '../constants/index.js';
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendMail.js';
import createHttpError from 'http-errors';

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
      expiresIn: FIFTEEN_MINUTES,
    },
  );
  //send email
  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: payload.email,
    subject: 'Reset your password',
    text: `<p>Hi ${user.name}!</p>
    <p> You requested a password reset. If you did not request a password reset, please ignore this email.</p>
    <p> Otherwise, Click <a href="${resetToken}">here</a> to reset your password!</p>`,
  });
  return user;
};

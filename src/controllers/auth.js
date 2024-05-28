import { registerUser, loginUser, logoutUser } from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    data: user,
    message: `Successfully created user  ${user.name}!`,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: new Date(Date.now() + ONE_DAY),
  });
  res.session('sessionId', session._id, {
    httpOnly: true,
    expire: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (res.cookies.sessionId) {
    await logoutUser(res.cookies.sessionId);
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');
  }

  res.status(204).send();
};

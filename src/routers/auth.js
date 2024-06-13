import { Router } from 'express';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  requestResetByEmailController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetByEmailSchema,
} from '../validation/auth.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post(
  '/request-reset-email',
  validateBody(requestResetByEmailSchema),
  ctrlWrapper(requestResetByEmailController),
);

router.post('/logout', authenticate, ctrlWrapper(logoutUserController));

router.post('/refresh', authenticate, ctrlWrapper(refreshUserController));

export default router;

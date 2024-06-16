import { Router } from 'express';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  requestResetByEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetByEmailSchema,
  resetPasswordSchema,
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
  '/send-reset-email',
  validateBody(requestResetByEmailSchema),
  ctrlWrapper(requestResetByEmailController),
);

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

router.post('/logout', authenticate, ctrlWrapper(logoutUserController));

router.post('/refresh', authenticate, ctrlWrapper(refreshUserController));

export default router;

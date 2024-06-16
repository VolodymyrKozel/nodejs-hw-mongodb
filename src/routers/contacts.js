import { upload } from '../middlewares/multer.js';

import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post(
  '',
  validateBody(createContactSchema),
  upload.single('photo'),
  ctrlWrapper(createContactController),
);
router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  upload.single('photo'),
  ctrlWrapper(patchContactController),
); //patch update

export default router;

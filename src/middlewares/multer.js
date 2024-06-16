import multer from 'multer';
import { TEMPLATES_DIR } from '../constants/index.js';

// multer config diskStorage save in temp folder then move to upload folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMPLATES_DIR);
  },
  filename: function (req, file, cb) {
    // unique suffix for unique filename
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });

import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { UPLOAD_DIR, TEMPLATES_DIR } from './constants/index.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMPLATES_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  setupServer();
};

bootstrap();

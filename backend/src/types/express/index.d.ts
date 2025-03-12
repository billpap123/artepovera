import * as multer from 'multer';

declare global {
  namespace Express {
    interface Request {
      file?: multer.File;  // Augment the Request interface to include the 'file' property
    }
  }
}

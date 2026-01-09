
import path from 'path';
import express from 'express';
import multer from 'multer';
import pkg from 'statuses';


const { message } = pkg;

const router = express.Router();

const storage = multer.diskStorage({ 
  destination(req, file, cb) { 
    cb(null, 'uploads/');
  },
  filename(req, file, cb) { 
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

function validateUploadFileType(file, cb) {  // aka checkFileType
  const filetypes = /jpg|jpeg|jpe|png|gif|bmp|tiff|tif|webp|svg|heif|heic|avif|raw|nef|cr2|arw|dng|psd|eps|apng/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) { 
    return cb(null, true);
  } else { 
    cb("Only recognized image file types (jpg|jpeg|jpe|png|gif|bmp|tiff|tif|webp|svg|heif|heic|avif|raw|nef|cr2|arw|dng|psd|eps|apng) allowed");
  }
};

const upload = multer({ 
  storage,
});

router.post('/', upload.single("product image"), (req, rest) => { 
  rest.send({ 
    message: "Success: Product image uploaded",
    image: `/${req.file.path}`
  });
});

export default router;

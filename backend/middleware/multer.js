import multer from "multer";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// ensure uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, UPLOAD_DIR);
  },
  filename: function (req, file, callback) {
    // create a safe unique filename: timestamp-originalname
    const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    callback(null, safeName);
  }
});

const upload = multer({ storage });

export default upload;

import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configure Storage (Where to save the file)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // Save to 'uploads' folder
  },
  filename(req, file, cb) {
    // Rename file to avoid duplicates (e.g. image-123456789.jpg)
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// File Filter (Only allow Images)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// The Upload Route
router.post("/", upload.single("image"), (req, res) => {
  // Return the path so frontend can save it
  res.send(`/${req.file.path}`);
});

export default router;
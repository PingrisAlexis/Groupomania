//Import package MULTER, to manage images.
const multer = require('multer');

//List of accepted images formats.
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

// Storage location and file name.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null, "images")
  },
  filename: (req, file, callback) => {
      let name = file.originalname.split(".")[0]
      name = name.split(" ").join("_")
      const extension = MIME_TYPES[file.mimetype]
      callback(null, name + Date.now() + "." + extension)
  }
})
const maxSize = 1 * 1024 * 1024;

var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize }
}).single('bestand');

module.exports = multer({storage: storage},{limits: {fileSize: maxSize }} ).single("image") 
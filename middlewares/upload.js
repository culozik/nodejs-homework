const multer = require('multer');
const path = require('path');

const tmpDir = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;

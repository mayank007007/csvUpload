const express = require('express');
const multer = require('multer')
const path = require('path');
const router = express.Router();
const FILE_PATH = path.join('/uploads/file');

const csvFileController = require('../controllers/csvFile_controller');

// for multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', FILE_PATH));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
const upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), csvFileController.upload);
router.get('/view/:id', csvFileController.view);
router.get('/delete/:id', csvFileController.delete);

module.exports = router;
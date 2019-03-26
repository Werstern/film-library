const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const multerConfig = {
    storage: multer.diskStorage({
        destination: function(req, file, next) {
            next(null, path.join(__dirname, '../../files'));
        },
        filename: function(req, file, next) {
            const length = file.originalname.split('.').length;
            const ext = file.originalname.split('.')[length - 1];
            next(null, file.fieldname + '-' + Date.now() + '.' + ext);
        }
    }),
    fileFIlter: function(req, file, next) {
        if (!file) {
            next();
        }

        const text = file.mimetype === 'text/plain';
        if (text) {
            next(null, true);
        } else {
            next({message: "File type is not supported"}, false);
        }
    }
    
};

router.post('/import', multer(multerConfig).single('file'), (req, res) => {
    if (req.file) {
        console.log(req.file);
        req.body.file = req.file.filename;
    }
    res.send('Ok');
});

module.exports = router;
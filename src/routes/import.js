const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const {promisify} = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);


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
        //console.log(req.file);
        //req.body.file = req.file.filename;
        
        //let parsedText = '';
        //    parsedText += buf.toString();

        readFileAsync(path.join(__dirname, '../../files/' + req.file.filename), {encoding: 'utf8'})
            .then((text) => {
                const arrFilms = text.split(/\n\s*\n/);

                const parsedArrFilms = arrFilms.map(film => {
                    const parsedFilm = film.split('\n').reduce((result, current) => {
                        const pair = current.split(':');
                        if (pair[0] === 'Release Year') {
                            result['releaseYear'] = pair[1]; 
                        } else {
                            result[pair[0].toLowerCase()] = pair[1];
                        }
                        return result;
                    }, {});
                    return parsedFilm;
                });
                console.log(parsedArrFilms);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    res.send('Ok');
});

module.exports = router;
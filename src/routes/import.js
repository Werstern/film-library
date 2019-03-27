const FilmModel = require('../models/film.model');

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
    fileFilter: function(req, file, next) {
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

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

router.post('/import', multer(multerConfig).single('file'), async (req, res) => {
    if (req.file) {
        const start = Date.now();

        try {
            const text = await readFileAsync(path.join(__dirname, '../../files/' + req.file.filename), {encoding: 'utf8'});
            const arrFilms = text.split(/\n\s*\n/);
            arrFilms.forEach((film, index) => {
                if (film === '') {
                    arrFilms.splice(index, 1);
                }
            });

            const parsedArrFilms = arrFilms.map(film => {
                const parsedFilm = film.split('\n').reduce((result, current) => {
                    const pair = current.split(':');
                    if (pair[0] === 'Release Year') {
                        result['releaseYear'] = (pair[1][0] === ' ') ? pair[1].slice(1) : pair[1]; 
                    } else { 
                        result[pair[0].toLowerCase()] = (pair[1][0] === ' ') ? pair[1].slice(1) : pair[1];
                    }
                    return result;
                }, {});
                return parsedFilm;
            });

            asyncForEach(parsedArrFilms, async (film) => {
                const model = new FilmModel(film);

                const doc = await model.save();
            });

            res.status(200).send('OK');
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else {
        res.status(500).send('No file in your request, sorry. Add txt file to request and try again');
    }
});

module.exports = router;
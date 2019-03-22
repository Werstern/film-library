const FilmModel = require('../models/film.model');
const express = require('express');
const router = express.Router();

router.get('/film/:filmId', (req, res) => {
  const filmId = req.params.filmId;

  FilmModel
    .findOne({
      _id: filmId
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/film/:filmId', (req, res) => {
  const filmId = req.params.filmId;

  if (!filmId) {
    return res.status(400).send('Missing URL parametr: filmId');
  }

  FilmModel
    .findOneAndRemove({
      _id: filmId
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;

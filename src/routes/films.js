const FilmModel = require('../models/film.model');
const express = require('express');
const router = express.Router();

router.post('/films', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  const body = {...req.body};

  const stars = body.stars.split(',').map(item => {
    const updatedItem = item.split('');
    if (updatedItem[updatedItem.length - 1] === ' ') {
      updatedItem.pop();
    }	
  
    if (updatedItem[0] === ' ') {
      updatedItem.shift();
    }
  
    return updatedItem.join('');
  });
  body.stars = stars;

  const model = new FilmModel(body);
  model.save()
    .then(doc => {
      if(!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }

      res.status(201).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

router.get('/films/:quantity?', (req, res) => {
  if (req.query.title) {
    FilmModel
      .find({
        title: new RegExp(req.query.title, 'i')
      })
      .then(doc => {
        res.json(doc);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else if (req.query.star) {
    FilmModel
      .find({
        stars: new RegExp(req.query.star, 'i')
      })
      .then(doc => {
        res.json(doc);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    const quantity = parseInt(req.params.quantity);

    FilmModel
      .find({})
      .sort({title: 1})
      .limit(quantity)
      .then(doc => {
        res.json(doc);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

module.exports = router;

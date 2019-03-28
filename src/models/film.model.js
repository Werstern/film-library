const mongoose = require('mongoose');

const config = require('../config.json');

mongoose.connect(`mongodb://${config.user}:${config.password}@${config.server}/${config.datebase}`);

const FilmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: String,
  releaseYear: {
    type: String,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  stars: [String]
});

module.exports = mongoose.model('Film', FilmSchema);

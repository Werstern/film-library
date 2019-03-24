const mongoose = require('mongoose');

const server = 'ds111765.mlab.com:11765';
const datebase = 'film-library';
const user = 'theadvansedtestuser';
const password = '8743b52063cd84097a65d1633f5c74f5';

mongoose.connect(`mongodb://${user}:${password}@${server}/${datebase}`);

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

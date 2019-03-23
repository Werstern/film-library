const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const config = require('./config.json');

const filmsRoute = require('./routes/films');
const filmRoute = require('./routes/film');

app.use(bodyParser.json());

app.use(filmsRoute);
app.use(filmRoute);
app.use(express.static('public'));

app.use((req, res, next) => {
  res.status(404).send('We think you are lost');
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.sendFile(path.join(__dirname, '../public/500.html'))
});

app.listen(config.serverPort, () => {
  console.log(`Listening on http://localhost:${config.serverPort}`);
});

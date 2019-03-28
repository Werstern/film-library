const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const config = require('./config.json');

const filmsRoute = require('./routes/films');
const filmRoute = require('./routes/film');
const importRoute = require('./routes/import');

app.use(bodyParser.json());

app.use(filmsRoute);
app.use(filmRoute);
app.use(importRoute);
app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.log('azaza');
  res.status(500).json(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.sendFile(path.join(__dirname, '../public/500.html'))
});

app.listen(config.serverPort, () => {
  console.log(`Listening on http://localhost:${config.serverPort}`);
});

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

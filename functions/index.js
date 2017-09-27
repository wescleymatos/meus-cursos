const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  const person = {name: 'Wescley Matos'};
  res.render('home/index', { person });
});

exports.app = functions.https.onRequest(app);

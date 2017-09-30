const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const firebaseApp = firebase.initializeApp(
  functions.config().firebase
);

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.set('views', path.join(path.resolve(path.dirname('')), 'views'));
app.set('view engine', 'ejs');


const insertUser = (collection, data) => {
  const ref = firebaseApp.database().ref(collection).push();

  ref.set(data);
};

app.get('/', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

  res.render('account/index');
});

app.post('/', (req, res) => {
  insertUser('users/', {nome: 'wescley alves matos', idade: 40});

  res.send({msg: 'Ok!'})
});

app.get('/dashboard', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

  const person = {name: 'Wescley Matos'};

  res.render('dashboard/index', { person });
});

exports.app = functions.https.onRequest(app);

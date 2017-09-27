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

// const authorized = (email, pass, redirect, error) => {
//   firebaseApp
//     .auth()
//     .signInWithEmailAndPassword(email, pass)
//     .then(() => 'deu certo')
//     .catch((error) => error);
// };

const insertUser = () => {
  const ref = firebaseApp.database().ref('users');

  return ref.set({nome: 'wescley', idade: 30});
};

app.get('/', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

  res.render('account/index');
});

app.post('/', (req, res) => {
  insertUser();
});

app.get('/dashboard', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

  const person = {name: 'Wescley Matos'};

  res.render('dashboard/index', { person });
});

exports.app = functions.https.onRequest(app);

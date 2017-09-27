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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// const authorized = (email, pass, redirect, error) => {
//   firebaseApp
//     .auth()
//     .signInWithEmailAndPassword(email, pass)
//     .then(() => 'deu certo')
//     .catch((error) => error);
// };

const insertUser = (user) => {
  const ref = firebaseApp.database().ref('users');

  return ref.set(user)
}

app.get('/', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

  res.render('account/index');
});

app.post('/', (req, res) => {
  const user = {
    users: [{
      email: req.bady.email,
      pass: req.body.pass
    }]
  }

  insertUser(user)
    .then(() => res.redirect('/dashboard/index'))
    .catch(() => res.redirect('/account/index'));

});

app.get('/dashboard', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

  const person = {name: 'Wescley Matos'};

  res.render('dashboard/index', { person });
});

exports.app = functions.https.onRequest(app);

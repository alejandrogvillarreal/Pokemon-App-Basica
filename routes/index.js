'use strict';
/* eslint-disable new-cap */

const User = require('../models/User')

const passport = require("../config/passport");

const isAuthenticated = require('../middlewares/isAuthenticated');

const router = require('express').Router();

router.use('/pokemons', require('./pokemons'));
router.use('/user', require('./user'));


router.get('/register', function (req, res, next) {
  res.render('register');
});

router.post('/register', function (req, res, next) {

  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  User.createUser(newUser, function (err, user) {
    if (err) res.redirect('/register');
    else  {
      req.login(user, function(err) {
        if (err) {
          console.log('ERROR LOGUEANDO AL USER');
        }
        return res.redirect('/pokemons');
      });
    }
  });
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post("/login", passport.authenticate("local", { successRedirect: '/pokemons', failureRedirect: '/login' }), function (req, res) {
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed
  res.render('pokemons');
});

// Endpoint to logout
router.get('/logout',isAuthenticated, function (req, res) {
  req.logout();
  res.redirect('/login')
});

router.get('/', function (req, res) {
  res.redirect('/user');
})


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
  res.status(404).end();
});

module.exports = router;







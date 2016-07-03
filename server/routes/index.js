var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt');
var User = require("../models/user.js");

var saltRounds = 10;

router.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

/* GET home page. */
router.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    // console.log(req.user);
    res.redirect('/');
  });

router.get('/register', function (req, res) {
  res.render('register');
});

router.post('/register', function (req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    User.registerUser(req.body.username, hash, function() {
      res.redirect("/login");
    });
  });



});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next(); }

  // denied. redirect to login
  res.redirect('/');
}

router.get('/protected', ensureAuthenticated, function(req, res) {
  res.send("access granted. secure stuff happens here");
});

module.exports = router;

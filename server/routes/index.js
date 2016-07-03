var express = require('express');
var router = express.Router();
var passport = require('passport');

var GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
    clientID: "1ba26fea18a2ac7c473f",
    clientSecret: "c4a9cf38040ef6d102f3f59a85b8cc2854cc07c2",
    callbackURL: "http://localhost:30000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

router.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var html = "<ul>\
    <li><a href='/auth/github'>GitHub</a></li>\
    <li><a href='/logout'>logout</a></li>\
  </ul>";

  if (req.isAuthenticated()) {
    html += "<p>authenticated as user:</p>";
    html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
  }

  res.send(html);
});

router.get('/auth/github', passport.authenticate('github'));

// GitHub will call this URL
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;

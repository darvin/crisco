
var express = require('express')
  , routes = require('./lib/routes')
  , passport = require('passport')
  , util = require('util')
  , mongoose = require('mongoose')
  , GitHubStrategy = require('passport-github').Strategy
  , MONGO_URL = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.MONGO_URI || 'mongodb://localhost/crisco'
  , PORT = process.env.PORT || 3000
  , SITE_ADDRESS = process.env.URL || ("http://localhost:" + PORT)
  , GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "44e8cb05744695db4acd"
  , GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "58bc01e40a89144c16b86199b8520f4045bdcc2a"
  , GITHUB_CALLBACK_URL = "" + SITE_ADDRESS + "/auth/github/callback"
  , models = require("./lib/models");

app = module.exports = express();
mongoose.connect(MONGO_URL);

passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(obj, done) {
  return done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: GITHUB_CALLBACK_URL,
  scope:["user", "repo"]
}, function(accessToken, refreshToken, profile, done) {
  return process.nextTick(function() {
    models.User.loginUser(accessToken, profile, function(err, user) {
      done(null, user);
    });
  });
}));

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: '231j4lweqkfjeopf7sdf'
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(function(req, res, next) {
    res.locals.baseUrl = SITE_ADDRESS;
    res.locals.user = req.user;
    return next();
  });
  app.use(app.router);
  return app.use(express["static"](__dirname + '/public'));
});

app.configure('development', function() {
  return app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function() {
  return app.use(express.errorHandler());
});

ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/auth/github');
};






app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', passport.authenticate('github', {
  failureRedirect: "/?login-error",
  successRedirect: "/"
}));

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


app.get('/', routes.home);
app.post('/webhook', routes.webhook);

app.port = PORT;

module.exports = app;
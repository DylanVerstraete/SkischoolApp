// =======================
// get the packages we need ============
// =======================

var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var morgan = require("morgan");
var hash = require('password-hash');
var passport = require('passport');
var localStorage = require('node-localstorage').localStorage;

var config = require('./server/app/config/config.js');
var Users = require('./server/app/models/user.js');

var USERS_COLLECTION = "users";

var app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

// connect to database
mongoose.connect(config.database);

// pass passport for configuration
require('./server/app/config/passport')(passport);

// Resolves the Access-Control-Allow-Origin error in the console
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect("mongodb://localhost:27017/skischool", function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get("/api/users/:email", function(req, res, next){
  Users.findOne({email:req.params.email},function(err, user){
    if(err) next(handleError(res, err.message));
    res.json(user);
  })
});

app.post("/api/users/edit/:email", function(req, res, next){
  Users.findOne({email: req.body.email},function(err,user){
    if(err) next(handleError(res, err.message));
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.address = req.body.address;
      user.addressnumber = req.body.addressnumber;
      user.addresspostalcode = req.body.addresspostalcode;
      user.addresscity = req.body.addresscity;
      user.telephonenumber = req.body.telephonenumber;
      user.save(function(err){
        if (err) next(handleError(res, err.message));
        res.json(user);
      });
    });
});

/*create sample user*/
app.get('/setup', function(req, res){
  var newUser = new Users({
    email: "erik@test.be",
    password: "test"
  });

  newUser.save(function(err) {
    if (err) {
      handleError(res, err.message, "Failed to create user");
      console.log("new user failed");
    }
    console.log("new user created");
  });

  res.json(newUser);
});

app.post('/api/signup', function(req, res) {
  if (!req.body.email || !req.body.password) {
    handleError(res, 'No email in body', 'Password or Email not valid', 400);
  } else {
    //create a new user
    var newUser = new Users({
      email: req.body.email,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        handleError(res, "Email bestaat al", "Email already exists.");
      }
      console.log("User aangemaakt");
    });
    res.json(newUser);
  }
});

app.post("/api/login", function(req,res){
  Users.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      handleError(res, "User not found", "User doesn't exists", 400);
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.encode(user, config.secret);
          res.json({
            email: user.email,
            password: user.password,
            token: token
          });
          console.log("User logged in");
        } else {
          handleError(res, "Wrong password", "Wrong password", 400);
        }
      });
    }
  });
});


//VOORBEELD VOOR JWT AUTHENTICATED ROUTE
app.get("/api/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json("Success! You can not see this without a token");
});


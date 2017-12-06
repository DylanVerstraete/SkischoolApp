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
var SkiCard = require('./server/app/models/skicard.js');
var Turn = require('./server/app/models/turn.js');
var Member = require('./server/app/models/member.js');


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

app.get('*', function(req, res){
  res.sendfile(__dirname + '/dist/index.html');
});
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect("mongodb://IceCold:tcoms99@ds129936.mlab.com:29936/skischool", function (err, database) {
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

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get("/api/users/", function(req,res,next){
  Users.find({}).populate({
    path:"skicards",
    model:"SkiCard",
    populate:{
      path:"turns",
      model:"Turn"
    }
  }).populate({path: "member", model: "Member"}).exec(function(err,users){
    if(err) next(handleError(res, err.message));
    res.json(users);
  })
})

app.get("/api/users/:email", function(req, res, next){
  Users.findOne({email:req.params.email},function(err, user){
    if(err) next(handleError(res, err.message));
  }).populate({
    path:"skicards",
    model:"SkiCard",
    }).populate({
      path:'member',
      model:"Member"
    }).exec(function(err,user){
    if(err) next(handleError(res, err.message));
    
    res.json(user);
  })
});

app.post("/api/users/edit/:email", function(req, res, next){
  console.log(req.body)
  Users.findOne({email: req.body.email},function(err,user){}).populate({
    path:"skicards",
    model:"SkiCard"
  }).exec(function(err,user){
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
  })
});

app.post("/api/users/requestCard/", function(req, res, next){
  Users.findOne({_id: req.body._id},function(err,user){
    if (err) next(handleError(res, err.message));
  }).populate({
    path:"skicards",
    model:"SkiCard"
  }).populate({path:"member", model:"Member"}).exec(function(err,user){
    if (err) next(handleError(res, err.message));
    var turns = [];

    for(var i = 0; i<10; i++){
      var turn = new Turn({
        minutes: 15,
        used: false
      });
      turns.push(turn);

      turn.save(function(err){
        if (err) next(handleError(res, err.message));
      });
    }

    let skicard = new SkiCard({
      numberOfTurns: 10,
      turns: turns,
      payed: false
    });
    console.log("USER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+user);
    user.skicards.push(skicard);
    user.totalskiturns += 10;
    console.log("USER BEURTEN!!!!!!!!!!!!!!!!!"+user.totalskiturns);
    skicard.save(function(err){
      if (err) next(handleError(res, err.message));
    });

    user.save(function(err){
      if (err) next(handleError(res, err.message));
      res.json(user);
    });
  })
});

app.post("/api/users/addCard/:id", function(req, res, next){
  SkiCard.findOne({_id: req.params.id},function(err,card){
    if (err) next(handleError(res, err.message));
  }).populate({
    path: "turns", model:"Turn"}).exec(function(err, card){
      if (err) next(handleError(res, err.message));
      card.payed = true;
      
      card.save(function(err){
        if (err) next(handleError(res, err.message));
      });

      res.json(card);
    });
});

/*create sample user*/
app.get('/api/setup', function(req, res, next){
  var newMember = new Member({
    pending: false,
    isMember: true
  })
  var newUser = new Users({
    email: "erik@test.be",
    password: "test",
    member: newMember,
    role: "admin",
    totalskiturns: 0
  });
  newUser.save(function(err) {
    if (err) {
      next(handleError(res, err.message, "Failed to create user"));
    }
  });
  newMember.save(function(err) {
    if (err) {
      next(handleError(res, err.message, "Failed to create user"));
    }
  });
  res.json(newUser);
});

app.post('/api/signup', function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    next(handleError(res, 'No email in body', 'Password or Email not valid', 400));
  } else {
    var newMember = new Member({
      isMember : false,
      pending: false
    })
    //create a new user
    var newUser = new Users({
      email: req.body.email,
      password: req.body.password,
      role: "user",
      totalskiturns: 0,
      member: newMember
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        next(handleError(res, "Email bestaat al", "Email already exists."));
      }
    });
    newMember.save(function(err) {
      if (err) {
        next(handleError(res, "Email bestaat al", "Email already exists."));
      }
    });
    res.json(newUser);
  }
});

app.post("/api/login", function(req,res, next){
  Users.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) next(handleError(res, "User not found", "User doesn't exists", 400));
    if (!user) {
      next(handleError(res, "User not found", "User doesn't exists", 400));
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.encode(user, config.secret);
          res.json({
            email: user.email,
            password: user.password,
            token: token,
            role: user.role
          });
          console.log("User logged in");
        } else {
          next(handleError(res, "Wrong password", "Wrong password", 400));
        }
      });
    }
  });
});

app.post("/api/add/pendingMember", function(req, res, next){
  console.log(req.body);
  
  Users.findOne({
    email: req.body.email
  },function(err,user){
    if (err) next(handleError(res, "User not found", "User doesn't exists", 400));    
  })
  .populate({path: "member", model:"Member"})
  .exec(function(err, user) {
    if(err) next(handleError(res, "User not found", "User doesn't exists", 400));
    user.member.pending = true;

    user.save(function(err) {
      if (err) {
        next(handleError(res, err.message, "User is already member"));
      }
    });

    user.member.save(function(err) {
      if (err) {
        next(handleError(res, err.message, "User is already member"));
      }
    });
    res.json(user);
  });
});

app.post("/api/add/member", function(req, res, next){
  console.log(req.body);
  Users.findOne({
    email: req.body.email
  },function(err,user){
    if (err) next(handleError(res, "User not found", "User doesn't exists", 400));    
  }).populate({
      path: "member",
      model:"Member"}).exec(function(err, user) {
    if(err) next(handleError(res, "User not found", "User doesn't exists", 400));
    user.member.pending = false;
    user.member.isMember = true;
    user.save(function(err) {
      if (err) {
        next(handleError(res, err.message, "User is already member"));
      }
    });

    user.member.save(function(err) {
      if (err) {
        next(handleError(res, err.message, "User is already member"));
      }
    });
    res.json(user);
  });
});


app.post("/api/delete/member", function(req, res, next){
  console.log(req.body);
  Users.findOne({
    email: req.body.email
  },function(err,user){
    if (err) next(handleError(res, "User not found", "User doesn't exists", 400));    
  }).populate({
      path: "member",
      model:"Member"}).exec(function(err, user) {
    if(err) next(handleError(res, "User not found", "User doesn't exists", 400));
    user.member.pending = false;
    user.member.isMember = false;
    user.save(function(err) {
      if (err) {
        next(handleError(res, err.message, "User is already member"));
      }
    });

    user.member.save(function(err) {
      if (err) {
        next(handleError(res, err.message, "User is already member"));
      }
    });
    res.json(user);
  });
});

app.post("/api/editTurn/", function(req, res, next){
  Turn.findOne({
    _id : req.body._id
  }, function(err, turn){
    if(err) next(handleError(res, "Turn not found", "Turn doesn't exists", 400));
    
    turn.minutes = req.body.minutes;
    //turn.used = req.body.used;

    if(turn.minutes = 0){
      turn.used = true;
    }

    turn.save(function(err){
      if (err) {
        next(handleError(res, err.message, "User is not a member"));
      }
    });
    
    res.json(turn);
  })
})

//VOORBEELD VOOR JWT AUTHENTICATED ROUTE
app.get("/api/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json("Success! You can not see this without a token");
});


// =======================
// get the packages we need ============
// =======================

const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const jwt = require('jwt-simple')
const morgan = require('morgan')
const passport = require('passport')

var config = require('./server/app/config/config.js')
var Member = require('./server/app/models/member.js')
var Users = require('./server/app/models/user.js')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())

// connect to database
mongoose.connect(config.database)

// pass passport for configuration
require('./server/app/config/passport')(passport)

// Resolves the Access-Control-Allow-Origin error in the console
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

// Create link to Angular build directory
var distDir = __dirname + '/dist/'
app.use(express.static(distDir))

// Connect to the database before starting the application server.
mongodb.MongoClient.connect('mongodb://localhost:27017/skischool', function (err, database) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('Database connection ready')

  // Initialize the app.
  var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port
    console.log('App now running on port', port)
  })
})

// Generic error handler used by all endpoints.
function handleError (res, reason, message, code) {
  console.log('ERROR: ' + reason)
  res.status(code || 500).json({'error': message})
};

app.use('/api/users', require('./server/routes/users/users'))
app.use('/api/cards', require('./server/routes/cards/cards'))
app.use('/api/setup', require('./server/routes/setup/setup'))
app.use('/api/turns', require('./server/routes/turns/turns'))

app.post('/api/signup', function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    next(handleError(res, 'No email in body', 'Password or Email not valid', 400))
  } else {
    var newMember = new Member({
      isMember: false,
      pending: false
    })
    // create a new user
    var newUser = new Users({
      email: req.body.email,
      password: req.body.password,
      role: 'user',
      totalskiturns: 0,
      member: newMember
    })
    // save the user
    newUser.save(function (err) {
      if (err) {
        next(handleError(res, 'Email bestaat al', 'Email already exists.'))
      }
    })
    newMember.save(function (err) {
      if (err) {
        next(handleError(res, 'Email bestaat al', 'Email already exists.'))
      }
    })
    res.json(newUser)
  }
})

app.post('/api/login', function (req, res, next) {
  Users.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) next(handleError(res, 'User not found', "User doesn't exists", 400))
    if (!user) {
      next(handleError(res, 'User not found', "User doesn't exists", 400))
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.encode(user, config.secret)
          res.json({
            email: user.email,
            password: user.password,
            token: token,
            role: user.role
          })
          console.log('User logged in')
        } else {
          next(handleError(res, 'Wrong password', 'Wrong password', 400))
        }
      })
    }
  })
})
/*
app.get('*', function(req, res){
  res.sendfile(distDir + 'index.html');
});
*/

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('./config.js')
// load up the user model
const User = require('../models/user')

module.exports = function (passport) {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = config.secret
  passport.use(new JwtStrategy(opts, function (payload, done) {
    User.findOne({id: payload.id}, function (err, user) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}

const router = require('express').Router()
const users = require('../../controllers/users/users')
var passport = require('passport')

router.get('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  users.all()
    .then(users => {
      res.json(users)
    })
    .catch(next)
})

router.get('/:email', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  users.get(req.params.email)
    .then(user => {
      res.json(user)
      .catch(next)
    })
})

router.post('/edit/:email', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const email = req.params.email
  const user = req.body
  users.edit(email, user)
    .then(user => {
      res.json(user)
      .catch(next)
    })
})

module.exports = router

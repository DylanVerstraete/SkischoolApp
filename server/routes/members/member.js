const router = require('express').Router()
const members = require('../../controllers/members')
var passport = require('passport')

router.post('/addPendingMember', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const email = req.body.email
  members.addPendingMember(email)
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

router.post('/addMember', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const email = req.body.email
  members.addMember(email)
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

router.delete('/deleteMember', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const email = req.body.email
  members.deleteMember(email)
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

module.exports = router

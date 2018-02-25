const router = require('express').Router()
const members = require('../controllers/members')
const passport = require('passport')

/*
  Makes a user member
*/
router.post('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const email = req.body.email
  members.createMember(email)
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const id = req.parmas.id
  members.deleteMember(id)
    .then(member => {
      res.json(member)
    })
    .catch(next)
})
/*
  Verifies a member
*/
router.post('/verify/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const id = req.params.id
  members.verify(id)
    .then(member => {
      res.json(member)
    })
    .catch(next)
})

module.exports = router

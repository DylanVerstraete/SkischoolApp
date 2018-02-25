const router = require('express').Router()
const turns = require('../controllers/turns')
const passport = require('passport')

router.post('/editTurn/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const id = req.params.id
  const minutes = req.body.minutes
  turns.edit(id, minutes)
    .then(turn => {
      res.json(turn)
    })
    .catch(next)
})

module.exports = router

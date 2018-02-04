const router = require('express').Router()
const turns = require('../controllers/turns')
var passport = require('passport')

router.post('/editTurn', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const id = req.body.id
  turns.edit(id)
    .then(turn => {
      res.json(turn)
    })
    .catch(next)
})

module.exports = router

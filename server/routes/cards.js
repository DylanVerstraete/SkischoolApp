const router = require('express').Router()
const cards = require('../controllers/cards')
var passport = require('passport')

router.post('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const id = req.body.id
  cards.addCard(id)
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

router.post('/markPayed/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const id = req.params.id
  cards.markAsPayed(id)
    .then(card => {
      res.json(card)
    })
    .catch(next)
})

module.exports = router

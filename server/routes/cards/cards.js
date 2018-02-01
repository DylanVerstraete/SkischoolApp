const router = require('express').Router()
const cards = require('../../controllers/cards/cards')
var passport = require('passport')

router.get('/requestCard', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const id = req.body.id
  cards.requestCard(id)
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

router.post('/addCard/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const id = req.params.id
  cards.addCard(id)
    .then(card => {
      res.json(card)
    })
    .catch(next)
})

module.exports = router

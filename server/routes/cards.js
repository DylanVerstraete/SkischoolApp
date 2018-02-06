const router = require('express').Router()
const cards = require('../controllers/cards')

router.post('/', function (req, res, next) {
  const id = req.body.id
  cards.addCard(id)
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

router.post('/markPayed/:id', function (req, res, next) {
  const id = req.params.id
  cards.markAsPayed(id)
    .then(card => {
      res.json(card)
    })
    .catch(next)
})

module.exports = router

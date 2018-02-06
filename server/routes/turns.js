const router = require('express').Router()
const turns = require('../controllers/turns')

router.post('/editTurn/:id', function (req, res, next) {
  const id = req.params.id
  const minutes = req.body.minutes
  turns.edit(id, minutes)
    .then(turn => {
      res.json(turn)
    })
    .catch(next)
})

module.exports = router

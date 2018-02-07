const router = require('express').Router()
const users = require('../controllers/users')

router.get('/', function (req, res, next) {
  users.all()
    .then(users => {
      res.json(users)
    })
    .catch(next)
})

router.get('/:email', function (req, res, next) {
  users.get(req.params.email)
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

router.post('/edit/:email', function (req, res, next) {
  const email = req.params.email
  const user = req.body
  users.edit(email, user)
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

module.exports = router

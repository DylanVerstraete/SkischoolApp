const router = require('express').Router()
const setup = require('../controllers/setup')

/* create sample user */
router.get('/', function (req, res, next) {
  setup.createAdminUser()
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

module.exports = router

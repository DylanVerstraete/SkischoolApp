const router = require('express').Router()
const setup = require('../controllers/setup')
const passport = require('passport')

/* create sample user */
router.get('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  setup.createAdminUser()
    .then(user => {
      res.json(user)
    })
    .catch(next)
})

module.exports = router

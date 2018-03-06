const router = require('express').Router()
const logs = require('../controllers/logs.js')
const passport = require('passport')

/*
  Makes a user member
*/
router.get('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  logs.getAll()
    .then(logs => {
      res.json(logs)
    })
    .catch(next)
})

router.get('/:userId', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const userId = req.params.userId
  logs.getLogsFromUser(userId)
    .then(logs => {
      res.json(logs)
    })
    .catch(next)
})

router.post('/:userId', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  const userId = req.params.userId
  const info = req.body.info
  logs.addLogToUser(userId, info)
    .then(res.sendStatus(200))
    .catch(next)
})

module.exports = router

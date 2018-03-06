const Log = require('../app/models/log')

function getAll () {
  return Log.find()
}

function getLogsFromUser (userId) {
  return Log.find({ userId }).exec()
}

function addLogToUser (userId, info) {
  const log = new Log({
    date: Date.now(),
    userId: userId,
    info: info
  })

  return log.save()
}

module.exports = { getAll, getLogsFromUser, addLogToUser }

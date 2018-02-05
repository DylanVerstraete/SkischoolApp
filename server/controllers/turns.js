const Turn = require('../app/models/turn')

function edit (id, minutes) {
  return Turn.findOne({
    _id: id
  }, function (err, turn) {
    if (err) return err
    turn.minutes = (turn.minutes - minutes)

    if (turn.minutes === 0 || turn.minutes < 0) {
      turn.used = true
    }

    return turn.save()
  })
}

module.exports = { edit }

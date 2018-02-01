const Turn = require('../../app/models/turn')

function edit (id, minutes) {
  Turn.findOne({
    _id: id
  }, function (turn) {
    turn.minutes = minutes

    if (turn.minutes === 0) {
      turn.used = true
    }

    turn.save()

    return turn
  })
}

module.export = { edit }

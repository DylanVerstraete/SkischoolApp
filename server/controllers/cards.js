var Users = require('../app/models/user.js')
const Turn = require('../app/models/turn')
const SkiCard = require('../app/models/skicard')

function addCard (id) {
  return Users.findOne({_id: id}, function (err, user) {
    if (err || err) return err
    
    let turns = []

    for (var i = 0; i < 10; i++) {
      var turn = new Turn({
        minutes: 15,
        used: false
      })
      turns.push(turn)
      turn.save()
    }

    let skicard = new SkiCard({
      numberOfTurns: 10,
      turns: turns,
      payed: false
    })

    user.skicards.push(skicard)
    user.totalskiturns += 10
    skicard.save()
    return user.save()
  })
}

function markAsPayed (id) {
  return SkiCard.findOne({_id: id}, function (card) {}).populate({
    path: 'turns',
    model: 'Turn'}).exec(function (err, card) {
      if (err) return err
      card.payed = true
      card.save()
    })
}

module.exports = { addCard, markAsPayed }

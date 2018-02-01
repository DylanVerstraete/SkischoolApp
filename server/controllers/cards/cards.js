var Users = require('../../app/models/user.js')
const Turn = require('../../app/models/turn')
const SkiCard = require('../../app/models/skicard')

function requestCard (id) {
  return Users.findOne({_id: id}).populate({
    path: 'skicards',
    model: 'SkiCard'
  }).populate({
    path: 'member',
    model: 'Member'}).exec(function (user) {
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
      user.save()
    })
}

function addCard (id) {
  return SkiCard.findOne({_id: id}, function (card) {}).populate({
    path: 'turns',
    model: 'Turn'}).exec(function (card) {
      card.payed = true
      card.save()
    })
}

module.exports = { requestCard, addCard }

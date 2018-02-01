var Users = require('../../app/models/user.js')

function all () {
  return Users.find({}).populate({
    path: 'skicards',
    model: 'SkiCard',
    populate: {
      path: 'turns',
      model: 'Turn'
    }
  }).populate({
    path: 'member',
    model: 'Member'})
  .exec()
}

function get (email) {
  return Users.findOne({email: email}).populate({
    path: 'skicards',
    model: 'SkiCard'
  }).populate({
    path: 'member',
    model: 'Member'
  }).exec()
}

function edit (email, details) {
  Users.findOne({email: email}).populate({
    path: 'skicards',
    model: 'SkiCard'
  }).exec(function (user) {
    user = details
    /*
    user.firstname = details.firstname
    user.lastname = details.body.lastname
    user.address = details.address
    user.addressnumber = details.addressnumber
    user.addresspostalcode = details.addresspostalcode
    user.addresscity = details.addresscity
    user.telephonenumber = details.telephonenumber
    */
    user.save()
  })
}

module.exports = { all, get, edit }

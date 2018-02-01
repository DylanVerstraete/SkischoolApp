var Users = require('../../app/models/user.js')

function addPendingMember (email) {
  Users.findOne({
    email: email
  }).populate({
    path: 'member',
    model: 'Member'}).exec(function (user) {
      user.member.pending = true

      user.save()
      user.member.save()

      return user
    })
}

function addMember (email) {
  Users.findOne({
    email: email}, function (user) {}).populate({
      path: 'member',
      model: 'Member'}).exec(function (user) {
        user.member.pending = false
        user.member.isMember = true

        user.save()
        user.member.save()

        return user
      })
}

function deleteMember (email) {
  Users.findOne({
    email: email}, function (user) {}).populate({
      path: 'member',
      model: 'Member'}).exec(function (user) {
        user.member.pending = false
        user.member.isMember = false
        user.save()

        user.member.save()
        return user
      })
}

module.exports = { addPendingMember, addMember, deleteMember }

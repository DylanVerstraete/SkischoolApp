var Users = require('../app/models/user.js')
const Member = require('../app/models/member')

function createMember (email) {
  return Users.findOne({ email: email })
    .populate({ path: 'member', model: 'Member' })
    .exec(function (err, user) {
      if (err) return err

      if (user.member != null) {
        return user
      }

      const member = new Member({
        pending: true
      })
      user.member = member
      member.save()
      return user.save()
    })
}

function verify (id) {
  return Member.findOne({ _id: id }).populate({ path: 'member', model: 'Member' }).exec(function (err, member) {
    if (err) return err
    member.pending = false
    return member.save()
  })
}

/*
  function delete (id) {
  Members.findOne({
    email: email}, function (user) {}).populate({
      path: 'member',
      model: 'Member'}).exec(function (user) {
        user.member.pending = false
        user.member.isMember = false
        return Promise.all([user.save(), user.member.save()])
      })
}
*/

module.exports = { createMember, verify }

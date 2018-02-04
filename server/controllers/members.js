var Users = require('../app/models/user.js')
const Member = require('../app/models/member')

function createMember (email) {
  console.log(email)
  return Users.findOne({ email: email }, function (err, user) {
    if (user.member) {
      return user
    }

    const member = new Member({
      pending: true
    })
    console.log(err)
    console.log(user)
    user.member = member
    // user.markModified('member')
    member.save()
    return user.save()
  })
}

function verify (id) {
  return Member.findOne({ _id: id }, function (member) {
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

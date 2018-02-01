const User = require('../../app/models/user')
const Member = require('../../app/models/member')

function createAdminUser () {
  const newMember = new Member({
    pending: false,
    isMember: true
  })
  const newUser = new User({
    email: 'erik@test.be',
    password: 'test',
    member: newMember,
    role: 'admin',
    totalskiturns: 0
  })
  newUser.save()
  newMember.save()

  return newUser
}

module.exports = { createAdminUser }

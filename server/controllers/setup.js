const User = require('../app/models/user')

function createAdminUser () {
  const newUser = new User({
    email: 'erik@test.be',
    password: 'test',
    role: 'admin',
    totalskiturns: 0
  })
  return newUser.save()
}

module.exports = { createAdminUser }

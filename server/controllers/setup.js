const User = require('../app/models/user')

function createAdminUser () {
  const newUser = new User({
    email: 'erik@test.be',
    password: 'test',
    role: 'admin',
    firstname: '',
    lastname: '',
    address: 'cooppallaan',
    addressnumber: '5',
    addresscity: 'wetteren',
    addresspostalcode: '9230',
    totalskiturns: 0
  })
  return newUser.save()
}

module.exports = { createAdminUser }

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var LogSchema = new Schema({
  date: {
    type: Date
  },
  info: {
    type: String
  },
  userId: {type: Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Log', LogSchema)

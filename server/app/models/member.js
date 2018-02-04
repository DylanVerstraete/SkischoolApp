var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
    pending: {
        type: Boolean,
    }
});

module.exports = mongoose.model('Member', MemberSchema);

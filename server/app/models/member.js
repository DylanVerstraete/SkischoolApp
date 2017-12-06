var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
    pending: {
        type: Boolean,
    },
    isMember: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Member', MemberSchema);

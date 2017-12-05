var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TurnSchema = new Schema({
    minutes: {
        type: Number,
        default: 15
    },
    used: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Turn', TurnSchema);

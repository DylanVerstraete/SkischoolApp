var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TurnSchema = new Schema({
    minutes: {
        type: Number,
        default: 15
    },
    used: {
        type: Boolean
    }
});

module.exports = mongoose.model('Turn', TurnSchema);

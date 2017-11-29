var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkiCardSchema = new Schema({
    numberOfTurns: {
        type: Number
    },
});

module.exports = mongoose.model('SkiCard', SkiCardSchema);

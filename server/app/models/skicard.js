var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkiCardSchema = new Schema({
    numberOfTurns: {
        type: Number
    },
    turns: [{type: Schema.ObjectId, ref: "Turn", default: 10}]
});

module.exports = mongoose.model('SkiCard', SkiCardSchema);

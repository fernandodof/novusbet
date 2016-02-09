var mongoose = require('mongoose');

var jogoSchema = new mongoose.Schema({
    local: String,
    data: Date,
    golsTime1: {type: Number, default: 0},
    golsTime2: {type: Number, default: 0},
    
    time1: {type: mongoose.Schema.Types.ObjectId, ref: 'time'},
    time2: {type: mongoose.Schema.Types.ObjectId, ref: 'time'}
});

module.exports = mongoose.model('jogo', jogoSchema);
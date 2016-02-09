var mongoose = require('mongoose');

var palpiteSchema = new mongoose.Schema({
    gols_time1: Number,
    gols_time2: Number,
    
    jogo: {type: mongoose.Schema.Types.ObjectId, ref: 'jogo' }
});

module.exports = mongoose.model('palpite', palpiteSchema);
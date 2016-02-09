var mongoose = require('mongoose');

var apostaSchema = new mongoose.Schema({
    pontuacao : {type: Number, default: 0},
    valor: {type: Number, default: 0},
    data: {type: Date, default: Date.now},
    
    apostador: {type: mongoose.Schema.Types.ObjectId, ref: 'apostador'},
    rodada: {type: mongoose.Schema.Types.ObjectId, ref: 'rodada'},
    palpites : [{type: mongoose.Schema.Types.ObjectId, ref: 'palpites'}]
});

module.exports = mongoose.model('aposta', apostaSchema);
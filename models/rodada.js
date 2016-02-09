var mongoose = require('mongoose');

var rodadaSchema = new mongoose.Schema({
    data_inicio: {type: Date, required: true },
    data_fim: {type: Date, required: true},
    finalizada: {type: Boolean, default: false},
    disponivel: {type: Boolean, default: false},

    campeonato: {type: mongoose.Schema.Types.ObjectId, ref: 'campeonato'},
    jogos: [{type: mongoose.Schema.Types.ObjectId, ref: 'jogo'}],
    apostas: [{type: mongoose.Schema.Types.ObjectId, ref: 'aposta'}]
});

module.exports = mongoose.model('rodada', rodadaSchema);
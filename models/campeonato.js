var mongoose = require('mongoose');

var campeonatoSchema = new mongoose.Schema({
    nome: String,
    ano: Number,
    finalizado: {type:Boolean, default: false },
    quantidade_times: {type: Number, default: 20}, 
    
    rodadas: [{type: mongoose.Schema.Types.ObjectId, ref: 'rodada'}]
});

module.exports = mongoose.model('campeonato', campeonatoSchema);
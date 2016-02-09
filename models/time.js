var mongoose = require('mongoose');

var timeSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    imagem : {type: String, required: true},
    ativo : {type: Boolean, default: true}
});

module.exports = mongoose.model('time', timeSchema);
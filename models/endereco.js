var mongoose = require('mongoose');

var enderecoSchema = new mongoose.Schema({
    rua: {type: String, required: true},
    bairro: {type: String, required: true},
    cidade: {type: String, required: true},
    estado: {type: String, required: true},
    cep: {type: String, required: true},
    complemento: String,
    
    endereco : {type: mongoose.Schema.Types.ObjectId, ref: 'endereco'},
});

module.exports = mongoose.model('endereco', enderecoSchema);
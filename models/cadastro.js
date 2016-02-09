var mongoose = require('mongoose');

var cadastroSchema = new mongoose.Schema({
    data_cadastro : Date, //Current date
    data_limite_confirmacao : Date,
    confirmado : {type: Boolean, default: false},
    
    apostador : {type: mongoose.Schema.Types.ObjectId, ref: 'apostador'}
});

module.exports = mongoose.model('cadastro', cadastroSchema);
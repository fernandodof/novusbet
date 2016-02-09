var mongoose = require('mongoose');
var Pessoa = require('./pessoa');

var options = { discriminatorKey: 'kind' };

var apostadorSchema = new mongoose.Schema({
    facebook: String,
    google: String,
    
    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    
    endereco : {type: mongoose.Schema.Types.ObjectId, ref: 'endereco'},
    apostas : [{type: mongoose.Schema.Types.ObjectId, ref: 'apostas'}],
}, options);

var apostadorSchema = Pessoa.discriminator('apostador', apostadorSchema);

module.exports = mongoose.model('apostador', apostadorSchema);

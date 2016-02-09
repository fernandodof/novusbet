var mongoose = require('mongoose');
var Pessoa = require('./pessoa');

var options = { discriminatorKey: 'kind' };

var adminSchema = Pessoa.descriminator('admin', new mongoose.Schema({
    ultimo_acesso : Date
}, options));

module.exports = mongoose.model('admin', adminSchema);
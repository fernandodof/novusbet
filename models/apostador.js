var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
//var Pessoa = require('./pessoa');

//var options = { discriminatorKey: 'kind' };

var apostadorSchema = new mongoose.Schema({
    local: {
        name: String,
        email: {type: String, unique: true},
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    sexo: String,
    nascimento: Date,
    ativo: {type: Boolean, default: true},
    token: String,
    endereco: {type: mongoose.Schema.Types.ObjectId, ref: 'endereco'},
    apostas: [{type: mongoose.Schema.Types.ObjectId, ref: 'apostas'}]
});

//apostadorSchema.pre('save', function(next) {
//    var pessoa = this;
//
//    // only hash the senha if it has been modified (or is new)
//    if (!pessoa.isModified('senha')) return next();
//
//    // generate a salt
//    bcrypt.genSalt(10, function(err, salt) {
//        if (err) return next(err);
//
//        // hash the senha using our new salt
//        bcrypt.hash(pessoa.senha, salt, function(err, hash) {
//            if (err) return next(err);
//
//            // override the cleartext senha with the hashed one
//            pessoa.senha = hash;
//            next();
//        });
//    });
//});

apostadorSchema.methods.validPassword = function (password, done) {
    return bcrypt.compareSync(password, this.local.password);
};

apostadorSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//var apostadorSchema = Pessoa.discriminator('apostador', apostadorSchema);

module.exports = mongoose.model('apostador', apostadorSchema);

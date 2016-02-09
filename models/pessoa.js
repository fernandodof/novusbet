var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var options = { discriminatorKey: 'kind' };

var pessoaSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: true},
    email: {type: String, unique: true, lowercase: true, required: true},
    senha: {type: String, select: false, required: true},
    sexo: String,
    nascimento: Date,
    ativa: {type: Boolean, default: true}
    
}, options);

pessoaSchema.pre('save', function(next) {
    var pessoa = this;

    // only hash the senha if it has been modified (or is new)
    if (!pessoa.isModified('senha')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the senha using our new salt
        bcrypt.hash(pessoa.senha, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext senha with the hashed one
            pessoa.senha = hash;
            next();
        });
    });
});

pessoaSchema.methods.validPassword = function(senha, done) {
  bcrypt.compare(senha, this.senha, function(err, isMatch) {
    done(err, isMatch);
  });
};

pessoaSchema.methods.generateHash = function(senha) {
    return bcrypt.hashSync(senha, bcrypt.genSaltSync(8), null);
};


module.exports = mongoose.model('pessoa', pessoaSchema);
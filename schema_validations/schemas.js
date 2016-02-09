var schemas = {};

//Equemas de validação para fazer novas apostas

//---------------- Inicio novas apostas

schemas.newApostaSchema = {
    id: '/NewApostaSchema',
    type: 'object',
    properties: {
        apostador : {type: 'string'},
        palpites : {
            type : 'array',
            items : {"$ref" : '/NewPalpiteSchema'}
        }    
    },
    required: ['apostador','palpites']
},

 
schemas.newPalpiteSchema = {
    id: '/NewPalpiteSchema',
    type: 'object',
    properties : {
        jogo: {'type': 'string'},
        gols_time1: {type : 'integer'},
        gols_time2: {type : 'integer'}
    },
    required : ['jogo', 'gols_time1', 'gols_time2']
};

//Exemplo válido para o esquema acima

//var instance = {
//    apostador: '1243k34n1jb1h31h',
//    palpites: [
//        {
//            'jogo': '235jnj23jj23n4j23nj',
//            'gols_time1': 2,
//            'gols_time2': 1
//        }
//    ]
//};

//---------------- Fim novas apostas

module.exports = schemas;
var express = require('express');
var router = express.Router();

var Rodada = require('../models/rodada');
var Aposta = require('../models/aposta');
var Palpite = require('../models/palpite');
var Jogo = require('../models/jogo');
var Apostas = require('../models/aposta');

var Validator = require('jsonschema').Validator;
var schemas = require('../schema_validations/schemas');
var Promise = require('bluebird');
var _ = require('lodash');

router.route('/')
    .get(function(req, res, next) {
        res.json({sucess: true, message: 'TODO recurso não impelentado'});
    })
    .post(function(req,res,next){
        res.json({sucess: true, message: 'TODO recurso não impelentado'});
    });

router.route('/:id')
    .get(function(req, res, next) {
        Rodada.findById(req.params.id, function (err, rodada){
             if(err){
                 return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao localizar a rodada', data: undefined});
             }else{
                 if(rodada){
                     return res.status(200).json({success:true, message: 'Rodada encotrada com sucesso', data: rodada});
                 }else{
                     return res.status(200).json({success: false, message: 'Rodada não encontrada', data: undefined});
                 }
             }
        });
    })
    .put(function(req,res,next){
        Rodada.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, rodadaUpdated){
            if(err){
                return res.status(500).json({sucess: false, message: 'Descuple, ocorreu um erro ao localizar a rodada', data: undefined});
            }else{
                if(rodadaUpdated){
                    return res.status(200).json({success: true, message: 'Rodada Atualizada com succeso', data: rodadaUpdated});
                }else{
                    return res.status(500).json({success: false, message: 'Rodada não encontrada', data: undefined});
                }
            }
        });
    })
    .delete(function(req,res,next){
        return res.status(200).json({sucess:true, message: 'TODO, remover/desativar aposta'});
    });

router.route('/:id/jogos')
    .post(function(req, res, next){
        Rodada.findById(req.params.id, function(err, rodada){
            if(err){
                return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao localizar a rodada', data: undefined});
            }else{
                if(rodada){
                    var newJogo = new Jogo(req.body);
                    
                    newJogo.save(function(err, jogo){
                        if(err){
                            return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao salvar o jogo', data: undefined});
                        }else{
                            rodada.jogos.push(jogo._id);
                            rodada.save(function(err, rodada){
                                if(err){
                                    return res.status(500).json({success: false, message: 'Descuple, ocorreu ao atualizar rodada', data: undefined});
                                }else{
                                    return res.status(200).json({sucess: true, message: 'Jogo criado com sucesso', data: jogo});
                                }    
                            });
                        }    
                    });
                }else{
                    return res.status(500).json({success: false, message: 'Rodada não encontrada', data: undefined});
                }     
            }   
        });
    })
    .get(function(req,res,next){
        Rodada
            .findById(req.params.id)
            .populate('jogos')
            .exec(function(err, rodada){
                if(err){
                    return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao localizar a rodada', data: undefined});
                }else{
                    if(rodada){
                        return res.status(200).json({success: true, message: 'Rodada encontrada com succeso', data: rodada});
                    }else{
                        return res.status(500).json({success: false, message: 'Rodada não encontrada', data: undefined});
                    }
                }
        });
    });

//TODO
router.route('/:id/apostas')
    .post(function(req, res, next){ 
        
        var newPalpites = req.body;
        if(newPalpites.palpites.length !== 10){
            return res.status(500).json({success: false, message: 'Por favor envie 10 palpites', data: undefined});
        }
    
        var v = new Validator();
        v.addSchema(schemas.newApostaSchema, '/NewApostaSchema');
        v.addSchema(schemas.newPalpiteSchema, '/NewPalpiteSchema');
        var validation = v.validate(newPalpites, schemas.newApostaSchema);
    
        if(validation.valid){
            Rodada.findById(req.params.id, function(err, rodada){
                if(err){
                    console.log(err);
                    
                    return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao localizar a rodada', data: undefined});
                }else{
                    
                    if(rodada){

                        checkIds(newPalpites.palpites)
                            .then(function(response){
                                console.log(response);

                                Palpite.collection.insert(newPalpites.palpites, function(err, palpites){
                                if(err){
                                    return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao salvar os palpites',
                                                                 data: undefined});   
                                }else{
                                    var newAposta = new Aposta();
                                    newAposta.apostador = newPalpites.apostador;
                                    newAposta.rodada = rodada._id;
                                    newAposta.palpites = palpites.insertedIds;

                                    newAposta.save(function(err, aposta){
                                        if(err){
                                            return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao salvar a aposta',
                                                                         data: undefined});
                                        }else{
                                            var aposta1 = JSON.parse(JSON.stringify(aposta));;
                                            aposta1.palpites = palpites.ops;
                                            
                                            return res.status(201).json({success: true, message: 'Aposta realizada com sucesso', data: aposta1}); 
                                        }

                                    });

                                }
                            });
                            
                            },
                            function(error){
                                return res.status(500).json({success: false, message: 'A aposta enviada está fora do formato esperado', 
                                                             data: undefined});
                            });
                        
                    }else{
                        return res.status(200).json({success: false, message: 'Rodada não encontrada', data: undefined});
                    }
                }
            });
            
        }else{
            return res.status(500).json({sucess: false, message: 'Requisição fora do formato esperado', data: validation});
        }
    
    });


var checkIds = function(palpites){

    var ids = palpites.map(function(palpite){
        return palpite.jogo;    
    });
    
    _.uniq(ids);
    
    return new Promise(function(resolve, reject){
        
        Jogo.count({'_id': {$in: ids} }, function(err, count) {
            if(err || count !== 10) {
                console.log(err);
                reject(false);
            }else{
                resolve(true);
            }
        }); 
    });
} 

//var checkIds = function(idsArray){
//    var promises = [];
//
//    idsArray.forEach(function(entry){
//        var promise = new Promise(function(resolve, reject){
//
//            Jogo.count({_id: entry.jogo}, function(err, count){
//                if(err || !count){
//                    reject(false);
//                } else {
//                    resolve(true);
//                }
//            });
//        }); 
//
//        promises.push(promise);
//    });
//    return Promise.all(promises);
//}

module.exports = router;
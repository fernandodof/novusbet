var express = require('express');
var router = express.Router();
var Campeonato = require('../models/campeonato');
var Rodada = require('../models/rodada');

router.route('/')
    .get(function(req, res, next) {
        res.json({sucess: true, message: 'TODO, retonar todas os campeonatos'});
    })
    .post(function(req,res,next){
        var newCampeonato = new Campeonato(req.body);
    
        newCampeonato.save(function(err, campeonatoCreated){
            if(err){
                return res.status(500).json({success: false, message: 'Desculpe, ocorreu um erro', data: undefined});
            }else{
                return res.status(201).json({success: true, message: 'Campeonato criado com succeso', data: campeonatoCreated});
            }    
        });
    });

router.route('/:id')
    .get(function(req, res, next) {
         Campeonato
            .findById(req.params.id, function(err, campeonato){
                 if(err){
                     return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao localizar o campeonato', data: undefined});
                 }else{
                     if(campeonato){
                         return res.status(200).json({success:true, message: 'Campeonato encontrado com sucesso', data: campeonato});
                     }else{
                         return res.status(500).json({success: false, message: 'Campeonato não encontrado', data: undefined});
                     }
                 }
        });
    })
    .put(function(req,res,next){
        Campeonato.findByIdAndUpdate(req.params.id, req.body, {new: true},function(err, campeonatoUpdated){
            if(err){
                return res.status(500).json({message: 'Descuple, ocorreu um erro ao localizar campeonato'});
            }else{
                if(campeonatoUpdated){
                    return res.status(200).json({success: true, message: 'Campeonato atualizado com sucesso', data: campeonatoUpdated});
                }else{
                    return res.status(500).json({success: false, message: 'Campeonato não encontrado', data: undefined});
                }
            }
        });
    })
    .delete(function(req,res,next){
        return res.status(200).json({sucess:true, message: 'TODO, remover/desativar jogo'});
    });

router.route('/:id/rodadas')
    .post(function(req, res, next){
        Campeonato.findById(req.params.id, function(err, campeonato){
            if(err){
                return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao localizar o campeonato', data: undefined});
            }else{
                if(campeonato){
                    var newRodada = new Rodada(req.body);
                    newRodada.campeonato = campeonato._id;
                    newRodada.save(function(err, rodada){
                        if(err){
                            return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao salvar rodada', data: undefined});
                        }else{
                            campeonato.rodadas.push(rodada._id);
                            campeonato.save(function(err, campeonato){
                                if(err){
                                    return res.status(500).json({success: false, message: 'Descuple, ocorreu ao atualizar campeonato', 
                                                                 data: undefined});
                                }else{
                                    return res.status(201).json({sucess: true, message: 'Rodada criada com sucesso', data: rodada});
                                }    
                            });
                        }    
                    });
                }else{
                    return res.status(500).json({success: false, message: 'Campeonato não encontrado', data: undefined});
                }     
            }  
        });
    })
    .get(function(req,res,next){
        Campeonato
            .findById(req.params.id)
            .populate('rodadas')
            .exec(function(err,campeonato){
                if(err){
                    return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao localizar o campeonato', data: undefined});
                }else{
                    if(campeonato){
                        return res.status(200).json({success: true, message: 'Cempeonato entrado com sucesso', data: campeonato});
                    }else{
                        return res.status(500).json({success: false, message: 'Campeonato não encontrado', data: undefined});
                    }
                }
        });
    });

module.exports = router;
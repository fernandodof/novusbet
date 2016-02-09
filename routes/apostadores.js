var express = require('express');
var router = express.Router();
var Apostador = require('../models/apostador');    
var Endereco = require('../models/endereco');
var Cadastro = require('../models/cadastro');
var moment_tz = require('moment-timezone');
var moment = require('moment');

router.route('/')
    .get(function(req, res, next) {
        res.status(200).json({success: true, message: 'TODO retornar todos os apostadores'});
    })
    .post(function(req,res,next){
        var newApostador = new Apostador(req.body.apostador);
        var newEndereco = new Endereco(req.body.endereco);   
    
        newEndereco.save(function(err, enderecoCreated){
            if(err){
                return res.status(500).json({success: false, message : 'Desculpe, o apostador não pode ser salvo', data: undefined});
                console.log(err);
            }else{
                newApostador.endereco = enderecoCreated._id;
                newApostador.save(newApostador,function(err, apostadorCreated){
                    if(err){
                        return res.status(500).json({success: false, message : 'Desculpe, o apostador não pode ser salvo', data: undefined});
                        console.log(err);
                    }else{
                        var newCadastro = new Cadastro();
                    
                        var now = moment();
                        
                        newCadastro.data_cadastro = now;
                        newCadastro.data_limite_confirmacao = now.add(24, 'hours');
                        newCadastro.apostador = apostadorCreated._id;
                            
                        newCadastro.save(function(err, cadastroCreated){
                            if(err){
                                console.log(err);
                                return res.status(500).json({success: false, message: 'Desculpe, o apostador não pode ser salvo', data: undefined});
                            }else{
                                return res.status(201).json({success: true, meessage: 'Apostador criado com sucesso', data: apostadorCreated});
                            } 
                        });
                    }
                });
            }
            
        });
        
    });

router.route('/:id')
    .get(function(req, res, next) {
        Apostador
            .findById(req.params.id)
            .populate('endereco')
            .exec(function(err,apostador){
                if(err){
                    return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao localizar apostador', data: undefined});
                }else{
                    if(apostador){
                        return res.status(200).json({success: true, message: 'Apostador encontrado com sucesso', data: apostador});
                    }else{
                        return res.status(500).json({success: false, message: 'Apostador não encontrado', data: undefined});
                    }
                }
        });
    
    })
    .put(function(req,res,next){
        Apostador.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, apostadorUpdated){
            if(err){
                return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao localizar apostador', data: undefined});
            }else{
                if(apostadorUpdated){
                    return res.status(200).json({success: true, message: 'Apostador atualizado com sucesso', data: apostadorUpdated});
                }else{
                    return res.status(500).json({success: false, message: 'Apostador não encontrado'});
                }
            }
        });
        
    })
    .delete(function(req,res,next){
        
    });

module.exports = router;

//
///* 
//router.route('/')
//    .get(function(req, res, next) {
//        res.send('respond with a resource');
//    })
//    .post(function(req,res,next){
//        
//    });
//
//router.route('/:id')
//    .get(function(req, res, next) {
//        res.send('respond with a resource');
//    })
//    .put(function(req,res,next){
//        
//    })
//    .delete(function(req,res,next){
//        
//    });
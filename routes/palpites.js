var express = require('express');
var router = express.Router();
var Palpite = require('../models/palpite');

router.route('/')
    .get(function(req, res, next) {
        res.json({sucess: true, message: 'TODO recurso não impelentado'});
    })
    .post(function(req,res,next){
        res.json({sucess: true, message: 'TODO recurso não impelentado'});
    });

router.route('/:id')
    .get(function(req, res, next) {
        Palpite.findById(req.params.id, function(err, palpite){
             if(err){
                 return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao localizar o palpite', data: undefined});
             }else{
                 if(palpite){
                     return res.status(200).json({success:true, message: 'Palpite encontrado com succeos', data: palpite});
                 }else{
                     return res.status(500).json({success: false, message: 'Palpite não encontrado', data: undefined});
                 }
             }
        });
    })
    .put(function(req,res,next){
        Palpite.findByIdAndUpdate(req.params.id, req.body, {new: true},function(err, palpiteUpdated){
            if(err){
                return res.status(500).json({message: 'Descuple, ocorreu um erro ao localizar palpite'});
            }else{
                if(palpiteUpdated){
                    return res.status(200).json({success: true, message: 'Palpite atualizado com sucesso', data: palpiteUpdated});
                }else{
                    return res.status(500).json({success: false, message: 'Palpite não encontrado', data: undefined});
                }
            }
        });
    })
    .delete(function(req,res,next){
        return res.status(200).json({sucess:true, message: 'TODO, remover/desativar palpite'});
    });

module.exports = router;
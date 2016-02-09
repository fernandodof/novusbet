var express = require('express');
var router = express.Router();
var Aposta = require('../models/aposta');

router.route('/')
    .get(function(req, res, next) {
        res.json({sucess: true, message: 'TODO recurso não impelentado'});
    })
    .post(function(req,res,next){
        res.json({sucess: true, message: 'TODO recurso não impelentado'});
    });

router.route('/:id')
    .get(function(req, res, next) {
        Aposta.findById(req.params.id, function(err, aposta){
             if(err){
                 return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao localizar o aposta', data: undefined});
             }else{
                 if(aposta){
                     return res.status(200).json({success: true, message: 'Aposta recuperada com sucesso', data: aposta});
                 }else{
                     return res.status(500).json({success: false, message: 'Aposta não encontrada', data: undefined});
                 }
             }
        });
    })
    .put(function(req,res,next){
        Aposta.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, apostaUpdated){
            if(err){
                return res.status(500).json({sucess:false, message: 'Descuple, ocorreu um erro ao localizar aposta', data: undefined});
            }else{
                if(apostaUpdated){
                    return res.status(200).json({success: true, message: 'Apota atualizada com sucesso', data: apostaUpdated});
                }else{
                    return res.status(500).json({success: false, message: 'Aposta não encontrada', data: undefined});
                }
            }
        });
    })
    .delete(function(req,res,next){
        return res.status(200).json({sucess:true, message: 'TODO, remover/desativar aposta'});
    });


module.exports = router;
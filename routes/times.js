var express = require('express');
var router = express.Router();
var Time = require('../models/time');

router.route('/')
    .get(function(req, res, next) {
        Time.find({ativo: true})
            .select('-ativo -__v')
            .exec(function(err, times){
                if(err){
                    return res.status(500).json({success: false, message: 'Desculpe, ocorreu um erro', data: undefined});
                }else{
                    if(times){
                        return res.status(200).json({sucess: true, message: 'Times encontrados com sucesso', data: times});
                    }else{
                        return res.status(500).json({sucess: false, message: 'Times não encontrados', data: undefined});
                    }
                }
        });
    })
    .post(function(req,res,next){
        var newTime = new Time(req.body);
    
        newTime.save(function(err,timeCreated){
            if(err){
                return res.status(500).json({success: false, message: 'Desculpe, ocorreu um erro', data: undefined});
            }else{
                return res.status(201).json({success: true, message: 'Time criado com sucesso', data: timeCreated});
            }
        });
    });

router.route('/:id')
    .get(function(req, res, next) {
        Time.findById(req.params.id, function(err, time){
             if(err){
                 return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao localizar o time', data: undefined});
             }else{
                 if(time){
                     return res.status(200).json({success:true, message: 'Time encontrado com sucesso', data: time});
                 }else{
                     return res.status(500).json({success: false, message: 'Time não encontrado', data: undefined});
                 }
             }
        });
    })
    .put(function(req,res,next){
        Time.findByIdAndUpdate(req.params.id, req.body, {new: true},function(err, timeUpdated){
            if(err){
                return res.status(500).json({sucess: false, message: 'Descuple, ocorreu um erro ao localizar time', data: undefined});
            }else{
                if(timeUpdated){
                    return res.status(200).json({success: true, message: 'Time atualizado com sucesso', data: timeUpdated});
                }else{
                    return res.status(500).json({success: false, message: 'Time não encontrado', data: undefined});
                }
            }
        });
    })
    .delete(function(req,res,next){
        return res.status(200).json({sucess:true, message: 'TODO, remover/desativar time'});
    });

module.exports = router;
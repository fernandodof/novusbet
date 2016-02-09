var express = require('express');
var router = express.Router();
var Jogo = require('../models/jogo');

router.route('/')
    .get(function(req, res, next) {
        res.json({sucess: true, message: 'TODO recurso não impelentado'});
    })
    .post(function(req,res,next){
        res.json({sucess: true, message: 'TODO recurso não impelentado'});
    });

router.route('/:id')
    .get(function(req, res, next) {
        Jogo.findById(req.params.id, function(err, jogo){
             if(err){
                 return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao localizar o jogo', data: undefined});
             }else{
                 if(jogo){
                     return res.status(200).json({success:true, messsage: 'Jogo encotrado com succeso', data: jogo});
                 }else{
                     return res.status(200).json({success: false, message: 'Jogo não encontrado', data: undefined});
                 }
             }
        });
    })
    .put(function(req,res,next){
        Jogo.findByIdAndUpdate(req.params.id, req.body, {new: true},function(err, jogoUpdated){
            if(err){
                return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao localizar jogo', data: undefined});
            }else{
                if(jogoUpdated){
                    return res.status(200).json({success: true, message: 'Jogo atualizado com sucesso', data: jogoUpdated});
                }else{
                    return res.status(500).json({success: false, message: 'Jogo não encontrado', data: undefined});
                }
            }
        });
    })
    .delete(function(req,res,next){
        return res.status(200).json({sucess:true, message: 'TODO, remover jogo'});
    });

router.route('/:id/times')
    .get(function(req, res, next){
        Jogo
            .findById(req.params.id)
            .populate('time1 time2')
            .exec(function(err, jogo){
                if(err){
                    console.log(err);
                    return res.status(500).json({success: false, message: 'Descuple, ocorreu um erro ao localizar o jogo', data: undefined});   
                }else{
                    if(jogo){
                         return res.status(200).json({success: true, message: 'Time encontrado com sucesso', data: jogo});
                    }else{
                        return res.status(500).json({success: false, message: 'Jogo não encontrado', data: undefined});
                    }
                }    
        });
    });

module.exports = router;
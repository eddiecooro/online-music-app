const express= require('express');
var route = express.Router();
const mongoose = require('mongoose');
var Playlist = require('../models/Playlist');



route.get('/',(req,res,next) =>{
    Playlist.find({},(err,result) =>{
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(result);
    });
});



route.get('/:id',(req,res,next) =>{
    Playlist.find({_id:req.params.id},(err,result) =>{
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(result);
    });
});

route.post('/',(req,res,next) =>{
    let playlist = new Playlist({
        name:req.body.name,
        tracks:req.body.tracks,
        cover:req.body.cover,
        private:req.body.private,
        expireDate:req.body.expireDate,
    });
    playlist.save().then((playlist) =>{
        console.log(`The Playlist With ${playlist._id} Has Been Created Successfully`)
        res.send(`The Playlist With ${playlist._id} Has Been Created Successfully`)
    }).catch((err) =>{
        console.log(err);
        res.send(err);
    })

});


module.exports = route;
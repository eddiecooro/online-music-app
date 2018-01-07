<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
var Playlist = require('../models/Playlist')
var router = express.Router();


// GET ALL PLAYLISTS
router.get('/', (req, res, next) => {
    Playlist.find({}, (err, result) => {
        if (err) {
            return next(err)
        }
        res.json(result)
    })
});


//GET SINGLE PLAYLIST BY ID
router.get('/:id', (req, res, next) => {
    Playlist.findById(req.params.id, (err, result) => {
        if (err) {
            return next(err)
        }
        res.json(result)
    })
});

//CREATE PLAYLIST
router.post('/', (req, res, next) => {
    let body = req.body;
    let playlist = new Playlist({
        name: body.name,
        tracks: body.tracks,
        cover: body.cover,
        private: body.private,
        expireDate: body.expireDate
    });
    playlist.save().then((user) => {
        res.json(user._id)
    }).catch((err) => {
        console.log(err);
        res.send(err)
    });
});



//UPDATE PLAYLIST
router.put('/:id',(req,res,next) => {
    Playlist.update(req.params.id,req.body,(err,result) =>{
        if(err){
            console.log(err);
            res.send(err)
        }
        res.send(req.params.id)
    })


});


//DELETE PLAYLIST
router.delete('/:id',(req,res,next) =>{
    Playlist.remove({ _id : req.params},(err,result) =>{
        if (err) {
            console.log(err);
            res.send(err)
        }
        res.send(req.params.id)
    })
})





=======
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
>>>>>>> refs/remotes/origin/Playlist-Route

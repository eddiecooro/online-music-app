const express = require('express');
var User = require('../models/User');
var router = express.Router();

// Get all users
router.get('/', (req, res, next)=>{
    console.log("get all users")
    User.find({}).then((data)=>{
        console.log(data);
        res.type('json');
        res.send(data);
    }).catch((err)=>{
        console.log(err);
        res.send(err);
    });
});

// Get user with specified ID
router.get('/:id', (req, res, next)=>{
    User.findById(req.params.id).then((data)=>{
        res.type('json');
        res.send(data);
    }).catch((err)=>{
        console.log(err);
        res.send(err);
    });
})

// Create new User
router.post('/', (req, res, next)=>{
    console.log(req.body);
    let body = req.body
    user = new User({
        username: body.username,
        password: body.password,
        email: body.email,
        avatar: body.avatar,
        nickname: body.nickname,
        gender: body.gender,
        age: body.age,
        playlist: body.playlist,
        followedArtist: body.followedArtist,
    });

    user.save().then((user)=>{
        res.type('json');
        res.send({id: user._id});
    }).catch((err)=>{
        res.send(err);  
    });
});

// Update existing user
router.put('/:id', (req, res, next)=>{
    User.find({_id: req.params.id}).then((user)=>{
        Object.assign(user, req.body);
        res.status(200);
        res.send({id: user._id});
    }).catch((err)=>{
        console.log(err);
        res.send(err);
    });
});

// Delete existing user
router.delete('/:id', (req, res, next)=>{
    User.remove({_id:req.params.id}).then(()=>{
        res.status(200);
        res.send();
    }).catch((err)=>{
        console.log(err);
        res.send(err);
    })
});

module.exports = router;
const jwt = require('jwt-simple');
import {User} from '../models';
import {jwtOptions} from '../config';

export const login = (req,res,next)=>{
    if(req.body.username && req.body.password){    
        let username = req.body.username;
        let password = req.body.password;
        User.findOne({username:username}).then((user)=>{
        if(user){
            user.verifyPassword(password).then((valid)=>{
            if(true){
                let payload = {id: user._id};
                let token = jwt.encode(payload, jwtOptions.jwtSecret);
                res.json({
                    token: token
                })
            } else {
                res.send("Password is incorrect");
            }
            }).catch((err)=>{
            res.send(err);
            })
        } else {
            res.send("User not found");
        }     
        }).catch((err)=>{
        res.send(err);
        })
    } else {
        res.send("no username | password")    
    }
}
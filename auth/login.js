const jwt = require('jwt-simple');
import User from '../models/User';
import {jwtOptions} from '../config';

export const login = (req,res,next)=>{
    if(req.body.username && req.body.password){    
        let username = req.body.username;
        let password = req.body.password;
        User.where({username:username},(err,user)=>{
            if(err){
                res.send(err);                
            } else if(user = user[0]){
                User.verifyPassword(user,password).then((valid)=>{
                    if(valid){
                        let payload = {id: user.id};
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
        })
    } else {
        res.send("no username | password")    
    }
}
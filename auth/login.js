const jwt = require('jwt-simple');
import User from '../models/User';
import {jwtOptions} from '../config';

export const login = async (username,password)=>{
    let user,valid;
    user = await new Promise((resolve,reject)=>{
        User.where({username:username},(err,user)=>{
            if(err) reject(err);
            if(user = user[0]) resolve(user);
            reject("User not found!");
        })
    });
    valid = await User.verifyPassword(user,password);
    if(valid){
        let payload = {id: user.id};
        let token = jwt.encode(payload, jwtOptions.jwtSecret);
        return token;
    } else {
        throw Error("Password is incorrect.");
    }
}
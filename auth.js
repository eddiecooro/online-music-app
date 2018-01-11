const passport = require('passport');
const passportJWT = require('passport-jwt');
import {User} from './models';
import {jwtOptions} from './config';
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: jwtOptions.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = ()=>{
    let strategy = new Strategy(params, async (payload,done)=>{
        User.find({username:payload.username}).then((user)=>{
            if(user){
                return done(null, {
                    id: user.id
                }); 
            } else {
                return done(new Error("User not found"),null);
            }
        });
    });
    passport.use(strategy);
    return {
        initialize: ()=>{
            return passport.initialize();
        },
        authenticate: ()=>{
            return passport.authenticate("jwt",jwtOptions.jwtSession);
        }
    }
}
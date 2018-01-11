const passport = require('passport')

export const graphqlAuthenticate = (req,res,next)=>{
    passport.authenticate("jwt",{session:false},function(err,user,info){
        if(err) { return next(err) }
        req.user = user
        next();
    })(req,res,next)
}
    
  
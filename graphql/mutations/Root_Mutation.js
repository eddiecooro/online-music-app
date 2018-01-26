import {User} from '../../models'
module.exports = {
    Mutation: {
        login:(source,{username,password},ctx)=>{
            return ctx.login(username,password);
        },
        createUser:(source,{user},ctx)=>{
            let newUser = new User(user);
            return(newUser.save().then((user)=>{
                user.__modelName = "User";
                return user;
            }))
        },
        updateUser:(source,{id,user},ctx)=>{
            return(User.update({_id:id},user).then((user)=>{
                user.__modelName = "User";
                return user;
            }));
        }
    }
}
import {User} from '../../models'
module.exports = {
    Mutation: {
        createUser:(source,{user},context)=>{
                let newUser = new User(user);
                return(newUser.save().then((user)=>{
                    user.__modelName = "User";
                    return user;
                }))
        },
        updateUser:(source,{id,user},context)=>{
            return(User.update({_id:id},user).then((user)=>{
                user.__modelName = "User";
                return user;
            }));
        }
    }
}
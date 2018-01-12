import {User} from '../../models'
module.exports = {
    Mutation: {
        createUser:(source,{user},context)=>{
                let newUser = new User(user);
                return(newUser.save())
        }
    }
}
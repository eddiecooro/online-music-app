export default {
    createUser:(source,{input},ctx)=>{
        return new Promise((resolve,reject)=>{
            ctx.models.User.save(input,(err,user)=>{
                if(err) {
                    if(err.statusCode === 409){
                        reject(new Error("User already exist."));
                    }
                };
                resolve(user);
            });
        });
    },
    updateUser:(source,{replace,input},ctx)=>{
        if(user && !input.id) input.id = ctx.user.id; 
        [input.__label,input.id] = ctx.driver.nodeIdToDbId(input.id);            
        return new Promise((resolve,reject)=>{
            ctx.models.User.read(input,(err,user)=>{
                if(!ctx.user || !(user.id === ctx.user.id || ctx.user.admin)){
                    reject("Access denied");
                }
                user = replace ? input : Object.assign(user,input);
                ctx.models.User.save(user,(err,user)=>{
                    if(err){
                        if(err.message.startsWith("Schema validation failed")){
                            reject(err.message.split("Got message: ")[1]);
                        }
                        reject(err.message);
                    }
                    resolve(user);
                });
            });
        });
    },
    deleteUser:(source,{replace,input},ctx)=>{
        if(!input && ctx.user) input = {id:"User:"+ctx.user.id};
        [input.__label,input.id] = ctx.driver.nodeIdToDbId(input.id);
        return new Promise((resolve,reject)=>{
            ctx.models.User.read(input.id,(err,user)=>{
                if(err) reject(err);
                if(!user) reject("User not found");
                if(!ctx.user || !(user.id === ctx.user.id || ctx.user.admin)){
                    reject("Access denied");
                }
                resolve(input);
            });
        }).then((input)=>{
            return ctx.driver.deleteNode(input.id,input.__label).catch((err)=>{
                console.log(err)
            });
        });
    },
}
export default {
    createArtist:(source,{input},ctx)=>{
        return new Promise((resolve,reject)=>{
            if(!(ctx.user && ctx.user.admin)){
                reject("Access denied");
            }
            ctx.models.Artist.save(input,(err,artist)=>{
                if(err) {
                    if(err.statusCode === 409){
                        reject(new Error("Artist already exist."));
                    }
                };
                resolve(artist);
            });
        });
    },
    updateArtist:(source,{replace,input},ctx)=>{
        [input.__label,input.id] = ctx.driver.nodeIdToDbId(input.id);            
        return new Promise((resolve,reject)=>{
            if(!(ctx.user && ctx.user.admin)){
                reject("Access denied");
            }
            ctx.models.Artist.read(input,(err,artist)=>{
                if(!artist) reject("Artist not found.");
                artist = replace ? input : Object.assign(artist,input);
                ctx.models.Artist.save(artist,(err,artist)=>{
                    if(err){
                        if(err.message.startsWith("Schema validation failed")){
                            reject(err.message.split("Got message: ")[1]);
                        }
                        reject(err.message)
                    }
                    resolve(artist);
                });
            });
        });
    },
    deleteArtist:(source,{replace,input},ctx)=>{
        [input.__label,input.id] = ctx.driver.nodeIdToDbId(input.id);
        return new Promise((resolve,reject)=>{
            if(!(ctx.user && ctx.user.admin)){
                reject("Access denied");
            }
            ctx.models.Artist.read(input.id,(err,artist)=>{
                if(err) reject(err);
                if(!artist) reject("Artist not found");
                resolve(input);
            });
        }).then((input)=>{
            return ctx.driver.deleteNode(input.id,input.__label).catch((err)=>{
                console.log(err)
            });
        });
    },
}
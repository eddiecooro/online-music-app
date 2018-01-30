export default {
    createAlbum:(source,{input, songIds=[]},ctx)=>{
        if(!(ctx.user && ctx.user.admin)){
            reject("Access denied");
        }

        songIds = songIds.map((targetId)=>{
            return ctx.driver.nodeIdToDbId(targetId)[1];
        })
        let rels = [{
            label: "SONG_OF",
            direction: "IN",
            targetIds: songIds
        }];
        return ctx.driver.createNodeWithRels(input,'Album',rels).then((result)=>(result[0]))
    },
    updateAlbum:(source,{input, replace},ctx)=>{
        [input.__label,input.id] = ctx.driver.nodeIdToDbId(input.id);            
        return new Promise((resolve,reject)=>{
            if(!(ctx.user && ctx.user.admin)){
                reject("Access denied");
            }
            ctx.models.Album.read(input,(err,album)=>{
                if(!album) reject("Album not found.");
                album = replace ? input : Object.assign(album,input);
                ctx.models.Album.save(album,(err,album)=>{
                    if(err){
                        if(err.message.startsWith("Schema validation failed")){
                            reject(err.message.split("Got message: ")[1]);
                        }
                        reject(err.message);
                    }
                    resolve(album);
                });
            });
        });
    },
    addSongsToAlbum:(source,{albumId,songIds=[]},ctx)=>{
        albumId = ctx.driver.nodeIdToDbId(albumId)[1];
        songIds = songIds.map((id)=>(ctx.driver.nodeIdToDbId(id)[1]));
        if(!(ctx.user && ctx.user.admin)){
            reject("Access denied");
        }
        let rels = [{
            label: "SONG_OF",
            direction: "IN",
            targetIds: songIds
        }];
        return ctx.driver.createRels(albumId,rels)
    },
    deleteAlbum:(source,{input},ctx)=>{
        [input.__label,input.id] = ctx.driver.nodeIdToDbId(input.id);
        return new Promise((resolve,reject)=>{
            if(!(ctx.user && ctx.user.admin)){
                reject("Access denied");
            }
            ctx.models.Album.read(input.id,(err,album)=>{
                if(err) reject(err);
                if(!album) reject("Album not found");
                resolve(input);
            });
        }).then((input)=>{
            return ctx.driver.deleteNode(input.id,input.__label).catch((err)=>{
                console.log(err)
            });
        });
    },
}
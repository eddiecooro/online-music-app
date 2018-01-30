export default {
    createSong:(source,{input, artistIds=[]},ctx)=>{
        if(!(ctx.user && ctx.user.admin)){
            reject("Access denied");
        }

        artistIds = artistIds.map((targetId)=>{
            return ctx.driver.nodeIdToDbId(targetId)[1];
        })
        let rels = [{
            label: "ARTIST_OF",
            direction: "IN",
            targetIds: artistIds
        }];
        return ctx.driver.createNodeWithRels(input,'Song',rels).then((result)=>(result[0]))
    },
    updateSong:(source,{input, replace},ctx)=>{
        [input.__label,input.id] = ctx.driver.nodeIdToDbId(input.id);            
        return new Promise((resolve,reject)=>{
            if(!(ctx.user && ctx.user.admin)){
                reject("Access denied");
            }
            ctx.models.Song.read(input,(err,song)=>{
                if(!song) reject("Song not found.");
                song = replace ? input : Object.assign(song,input);
                ctx.models.Song.save(song,(err,song)=>{
                    if(err){
                        if(err.message.startsWith("Schema validation failed")){
                            reject(err.message.split("Got message: ")[1]);
                        }
                        reject(err.message);
                    }
                    resolve(song);
                });
            });
        });
    },
    addArtistsToSong:(source,{songId,artistIds=[]},ctx)=>{
        songId = ctx.driver.nodeIdToDbId(songId)[1];
        artistIds = artistIds.map((id)=>(ctx.driver.nodeIdToDbId(id)[1]));
        if(!(ctx.user && ctx.user.admin)){
            reject("Access denied");
        }
        let rels = [{
            label: "ARTIST_OF",
            direction: "IN",
            targetIds: artistIds
        }];
        return ctx.driver.createRels(songId,rels)
    },
    deleteSong:(source,{input},ctx)=>{
        [input.__label,input.id] = ctx.driver.nodeIdToDbId(input.id);
        return new Promise((resolve,reject)=>{
            if(!(ctx.user && ctx.user.admin)){
                reject("Access denied");
            }
            ctx.models.Song.read(input.id,(err,song)=>{
                if(err) reject(err);
                if(!song) reject("Song not found");
                resolve(input);
            });
        }).then((input)=>{
            return ctx.driver.deleteNode(input.id,input.__label).catch((err)=>{
                console.log(err)
            });
        });
    },
}
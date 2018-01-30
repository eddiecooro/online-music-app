export default {
    createPlaylist:(source,{input, songIds=[], ownerId},ctx)=>{
        if(!(ctx.user)){
            reject("Access denied");
        } else if (!(ctx.user && ctx.user.admin)){
            ownerId = ctx.user.id;
        }

        songIds = songIds.map((targetId)=>{
            return ctx.driver.nodeIdToDbId(targetId)[1];
        })
        let rels = [{
            label: "CONTAINS",
            direction: "OUT",
            targetIds: songIds
        },{
            label: "CREATED_BY",
            direction: "IN",
            targetIds: [ownerId]
        }];
        return ctx.driver.createNodeWithRels(input,'Playlist',rels).then((result)=>(result[0]))
    },
    updatePlaylist:(source,{input, replace},ctx)=>{
        [input.__label,input.id] = ctx.driver.nodeIdToDbId(input.id);            
        return new Promise((resolve,reject)=>{
            if(!(ctx.user && ctx.user.admin)){
                reject("Access denied");
            }
            ctx.models.Playlist.read(input,(err,playlist)=>{
                if(!playlist) reject("Playlist not found.");
                ctx.driver.relationships(playlist,'out','CREATED_BY',(err,rels)=>{
                    if(!(rels[0].end === ctx.user.id || ctx.user.admin)){
                        reject("Access denied");
                    }
                })
                playlist = replace ? input : Object.assign(playlist,input);
                ctx.models.Playlist.save(playlist,(err,playlist)=>{
                    if(err){
                        if(err.message.startsWith("Schema validation failed")){
                            reject(err.message.split("Got message: ")[1]);
                        }
                        reject(err.message);
                    }
                    resolve(playlist);
                });
            });
        });
    },
    addSongsToPlaylist:(source,{playlistId,songIds=[]},ctx)=>{
        playlistId = ctx.driver.nodeIdToDbId(playlistId)[1];
        songIds = songIds.map((id)=>(ctx.driver.nodeIdToDbId(id)[1]));
        if(!(ctx.user && ctx.user.admin)){
            reject("Access denied");
        }
        let rels = [{
            label: "CONTAINS",
            direction: "OUT",
            targetIds: songIds
        }];
        return ctx.driver.createRels(playlistId,rels)
    },
    changePlaylistOwner:(source,{playlistId,ownerId},ctx)=>{
        playlistId = ctx.driver.nodeIdToDbId(playlistId)[1];
        songIds = songIds.map((id)=>(ctx.driver.nodeIdToDbId(id)[1]));
        if(!(ctx.user)){
            reject("Access denied");
        } else if (!(ctx.user && ctx.user.admin)){
            ownerId = ctx.user.id;
        }
        let rels = [{
            label: "CREATED_BY",
            direction: "IN",
            targetIds: ownerId
        }];
        return ctx.driver.createRels(playlistId,rels)
    },
    deletePlaylist:(source,{input},ctx)=>{
        [input.__label,input.id] = ctx.driver.nodeIdToDbId(input.id);
        return new Promise((resolve,reject)=>{
            if(!(ctx.user && ctx.user.admin)){
                reject("Access denied");
            }
            ctx.models.Playlist.read(input.id,(err,playlist)=>{
                if(err) reject(err);
                if(!playlist) reject("Playlist not found");
                resolve(input);
            });
        }).then((input)=>{
            return ctx.driver.deleteNode(input.id,input.__label).catch((err)=>{
                console.log(err)
            });
        });
    },
}
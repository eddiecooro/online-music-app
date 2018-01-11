module.exports = {
    //Root Query
    Query: {
        //Every Type Is A Node
        //NodeID like => User:fj392739872dk
        node:(source,args,context)=>{
            return context.getData_Id(...context.nodeIdToDbId(args.id)).then((data)=>{
                return data;
            }).catch((err)=>{
                console.log(err);
            });
        }
    },
    //Specify Which Resolve Should Go
    Node: {
        __resolveType(source, context, info){
            return source.__modelName;
        }
    },
    
    
   

       

    Artist: {
        id: (source, args, context)=>{
            return context.dbIdToNodeId(source.__modelName, source._id);
        },
        albums: async (source,args,context) =>{
             var albumIds = [];
             var songId = source.songs.map((s) =>{
                 return s.song
             });
             
             await context.getData("Song",songId,{'_id' : {$in : songId}},{'albumId':1}).then((data) => {
                if(!Array.isArray(data)){
                    data = [data]
                }
                albumIds = data.slice()
                 return data
             }).catch((err) => {
                 console.log(err)
             });
             albumIds = albumIds.map((e) =>{
                 return e.albumId
             })
             albumIds = albumIds.filter((e,p) =>{
                    return albumIds.indexOf(e) == p;
             })
            return context.getData("Album",albumIds).then((data)=>{
                if(!Array.isArray(data)){
                    data = [data]
                }
                return data
            }).catch((err) => {
                console.log(err)
            })
        },
        songs: (source, args, context)=>{
            let songIds = source.songs.map((songRel)=>{
                return songRel.song;
            });
            return context.getData("Song",songIds).then((data)=>{
                if(!Array.isArray(data)){
                    data = [data]
                }
                return data
            }).catch((err)=>{
                console.log(err)
            });
        },
    }
    
}
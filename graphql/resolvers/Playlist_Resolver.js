module.exports = {

    Playlist: {
        //Get Id From NodeId
        id: (source, args, context)=>{
            return context.db.dbIdToNodeId(source.__modelName, source._id);
        },
        
        tracks: (source,args,context) =>{
            var songId = source.tracks
            return context.db.getData_Id("Song",songId) 
        },
        trackCount: (source,args,context) =>{
            return source.tracks.length
        }
    }
}
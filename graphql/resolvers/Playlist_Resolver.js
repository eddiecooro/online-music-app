module.exports = {

    Playlist: {
        //Get Id From NodeId
        id: (source, args, context)=>{
            return context.dbIdToNodeId(source.__modelName, source._id);
        },
        
        tracks: (source,args,context) =>{
            var songId = source.tracks
            return context.getData_Id("Song",songId) 
        },
        trackCount: (source,args,context) =>{
            return source.tracks.length
        }
    }
}
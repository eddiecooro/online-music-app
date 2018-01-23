module.exports = {

    Playlist: {
        //Get Id From NodeId
        id: (source, args, context)=>{
            return context.driver.dbIdToNodeId("Playlist",source.id);
        },
        
        tracks: (source,args,context) =>{
            return context.driver.getRels(source,"CONTAINS","OUT", "Song");            
        },
        trackCount: (source,args,context) =>{
            return 2
        }
    }
}
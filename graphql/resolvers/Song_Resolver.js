module.exports = {
    Song: {
        id: (source, args, context) => {
            return context.driver.dbIdToNodeId("Song",source.id);
        },
        album: (source, args, context) => {
            return context.driver.getRels(source,"SONG_OF","OUT", "Album").then((res)=>(res[0]));
        },
        artists: (source, args, context) => {
            return context.driver.getRels(source,"ARTIST_OF","IN", "Artist");            
        }
    }
}
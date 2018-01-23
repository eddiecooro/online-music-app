module.exports = {
    Album: {
        id: (source, args, context) => {
            return context.driver.dbIdToNodeId("Album",source.id);
        },
        songs: (source, args, context) => {
            return context.driver.getRels(source,"SONG_OF","IN", "Song");
        },
        artist: async (source, args, context) => {
            
        }
    }
}

module.exports = {
    Artist: {
        id: (source, args, context) => {
            return context.driver.dbIdToNodeId("Artist",source.id);
        },
       
        albums: (source, args, context) => {
            
        },

        songs: (source, args, context) => {
            return context.driver.getRels(source,"ARTIST_OF","OUT", "Artist");       
        },
    }
}
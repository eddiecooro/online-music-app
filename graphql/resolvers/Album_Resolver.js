module.exports = {
    Album: {
        id: (source, args, context) => {
            return context.driver.dbIdToNodeId("Album",source.id);
        },
        songs: (source, args, context) => {
            return context.driver.getRels(source,"SONG_OF","IN", "Song");
        },
        artists: async (source, args, context) => {
            return context.driver.getRels(source,[
                {label:"SONG_OF",direction:"IN"},
                {label:"ARTIST_OF",direction:"IN"}
            ],"Artist")
        }
    }
}

module.exports = {
    Artist: {
        id: (source, args, context) => {
            return context.driver.dbIdToNodeId("Artist",source.id);
        },
       
        albums: (source, args, context) => {
            return context.driver.getRels(source,[
                {label:"ARTIST_OF",direction:"OUT"},
                {label:"SONG_OF",direction:"OUT"}
            ],"Album")
        },

        songs: (source, args, context) => {
            return context.driver.getRels(source,{label:"ARTIST_OF",direction:"OUT"}, "Song");       
        },
    }
}
module.exports = {
    Song: {
        id: (source, args, context) => {
            return context.driver.dbIdToNodeId("Song",source.id);
        },
        album: (source, args, context) => {
            return context.driver.getRels(source,{label:"SONG_OF",direction:"OUT"}, "Album").then((res)=>(res[0]));
        },
        artists: (source, args, context) => {
            return context.driver.getRels(source,{label:"ARTIST_OF",direction:"IN"}, "Artist");            
        }
    }
}
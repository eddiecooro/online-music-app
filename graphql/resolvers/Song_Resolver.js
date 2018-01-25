module.exports = {
    Song: {
        id: (source, args, ctx) => {
            return ctx.driver.dbIdToNodeId("Song",source.id);
        },
        album: (source, args, ctx) => {
            return ctx.loader.song.albumLoader.load(source.id).then((res)=>(res[0]));
        },
        artists: (source, args, ctx) => {
            return ctx.loader.song.artistLoader.load(source.id); 
        }
    }
}
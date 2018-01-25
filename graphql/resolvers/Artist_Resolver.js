module.exports = {
    Artist: {
        id: (source, args, ctx) => {
            return ctx.driver.dbIdToNodeId("Artist",source.id);
        },
       
        albums: (source, args, ctx) => {
            return ctx.loader.artist.albumLoader.load(source.id);
        },

        songs: (source, args, ctx) => {
            return ctx.loader.artist.songLoader.load(source.id);
        },
    }
}
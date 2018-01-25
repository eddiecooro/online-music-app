module.exports = {
    Album: {
        id: (source, args, ctx) => {
            return ctx.driver.dbIdToNodeId("Album",source.id);
        },
        songs: (source, args, ctx) => {
            return ctx.loader.album.songLoader.load(source.id);
        },
        artists: (source, args, ctx) => {
            return ctx.loader.album.artistLoader.load(source.id);
        }
    }
}

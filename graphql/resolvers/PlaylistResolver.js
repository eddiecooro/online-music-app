module.exports = {

    Playlist: {
        //Get Id From NodeId
        id: (source, args, ctx) => {
            return ctx.driver.dbIdToNodeId("Playlist", source.id);
        },

        tracks: (source, args, ctx) => {
            return ctx.loader.playlist.trackLoader.load(source.id);
        },

        trackCount: (source, args, ctx) => {
            return ctx.loader.playlist.trackCountLoader.load(source.id);
        }
    }
}
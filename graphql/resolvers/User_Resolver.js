module.exports = {
    User: {
            id: (source, args, ctx, info) => {
                return ctx.driver.dbIdToNodeId("User",source.id);
            },
            playlists: (source, args, ctx) => {
                return ctx.loader.user.playlistLoader.load(source.id);
            },
            followedArtists: (source, args, ctx) => {
                return ctx.loader.user.followedArtistLoader.load(source.id);
            },
            listenedSongs: (source, args, ctx) => {
                if(ctx.user.id === source.id || ctx.user.admin){
                    return ctx.loader.user.listenedSongsLoader.load(source.id)
                } else {
                    return null;
                }
            },
            likedSongs: (source, args, ctx) => {
                return ctx.loader.user.likedSongsLoader.load(source.id);
            },
            hatedSongs: (source, args, ctx) => {
                if(ctx.user.id === source.id || ctx.user.admin){
                    return ctx.loader.user.hatedSongsLoader.load(source.id);
                } else {
                    return null;
                }
            }
        }
    }
module.exports = {
    User: {
            id: (source, args, context, info) => {
                return context.driver.dbIdToNodeId("User",source.id);
            },
            playlists: (source, args, context) => {
                return context.driver.getRels(source,"CREATED_BY","IN","Playlist");
            },
            followedArtists: (source, args, context) => {
                return context.driver.getRels(source, "FOLLOWED","OUT", "Artist");
            },
            listenedSongs: (source, args, context) => {
                return context.driver.getRels(source, "LISTENED","OUT", "Song");
            },
            likedSongs: (source, args, context) => {
                return context.driver.getRels(source, "LIKED","OUT", "Song");                                
            },
            hatedSongs: (source, args, context) => {
                return context.driver.getRels(source, "HATED","OUT", "Song");                                
            }
        }
    }
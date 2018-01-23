module.exports = {
    User: {
            id: (source, args, context, info) => {
                return context.driver.dbIdToNodeId("User",source.id);
            },
            playlists: (source, args, context) => {
                return context.driver.getRels(source,{label:"CREATED_BY",direction:"IN"},"Playlist");
            },
            followedArtists: (source, args, context) => {
                return context.driver.getRels(source, {label:"FOLLOWED",direction:"OUT"}, "Artist");
            },
            listenedSongs: (source, args, context) => {
                return context.driver.getRels(source, {label:"LISTENED",direction:"OUT"}, "Song");
            },
            likedSongs: (source, args, context) => {
                return context.driver.getRels(source, {label:"LIKED",direction:"OUT"}, "Song");                                
            },
            hatedSongs: (source, args, context) => {
                return context.driver.getRels(source, {label:"HATED",direction:"OUT"}, "Song");                                
            }
        }
    }
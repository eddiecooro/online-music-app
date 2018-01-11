module.exports  = {
    User: {
        //get Id From Node Id
        id: (source, args, context) => {
            return context.dbIdToNodeId(source.__modelName, source._id);
        },
        playlists: (source, args, context) => {
            return context.getData_Id("Playlist", source.playlists).then((data) => {
                return data
            }).catch((err) => {
                console.log(err)
            });
        },
        followedArtists: (source, args, context) => {
            return context.getData_Id("Artist", source.followedArtists).then((data) => {
                return data
            }).catch((err) => {
                console.log(err)
            });
        },
        listenedSongs: (source, args, context) => {
            //songRel like => {rel:"liked",songId:"jlk23132980dd"}
            let songrels = source.songsRels;
            let listeneds = songrels.filter((e) => {
                return e.rel === "listened";
            });
            let listenedIds = listeneds.map((e) => {
                return e.songId;
            });
            return context.getData_Id("Song", listenedIds).then((data) => {
                return data
            }).catch((err) => {
                console.log(err)
            });
        },
        likedSongs: (source, args, context) => {
            //songRel like => {rel:"liked",songId:"jlk23132980dd"}
            let songrels = source.songsRels;
            let likeds = songrels.filter((srel) => {
                return srel.rel === "liked";
            });
            let likedIds = likeds.map((liked) => {
                return liked.songId;
            });
            return context.getData_Id("Song", likedIds).then((data) => {
                return data
            }).catch((err) => {
                console.log(err)
            });
        },
    }
}
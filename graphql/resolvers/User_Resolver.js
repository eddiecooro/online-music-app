var {convertCursorToNodeId,nodeIdToConvertCursor} = require('./ResolverHelper')
module.exports  = {
    User: {
        //get Id From Node Id
        id: (source, args, context) => {
            return context.db.dbIdToNodeId(source.__modelName, source._id);
        },
        playlists: (source, args, context) => {
            return context.db.getData_Id("Playlist", source.playlists).then((data) => {
                return data
            }).catch((err) => {
                console.log(err)
            });
        },
        getSongs: async (source,args,context) =>{
            let first = args.first
            let last = args.last
            return context.db.Paginetion("User","Song",source._id,args.first,args.last).then((data)=>{
                return data
            })
            


        },
       
        followedArtists: (source, args, context) => {
            return context.db.getData_Id("Artist", source.followedArtists).then((data) => {
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
            return context.db.getData_Id("Song", listenedIds).then((data) => {
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
            return context.db.getData_Id("Song", likedIds).then((data) => {
                return data
            }).catch((err) => {
                console.log(err)
            });

        },
        hatedSongs:(source,args,context) =>{
            //songRel like => {rel:"liked",songId:"jlk23132980dd"}
            let songrels = source.songsRels;
            let likeds = songrels.filter((srel) => {
                return srel.rel === "hated";
            });
            let likedIds = likeds.map((liked) => {
                return liked.songId;
            });
            return context.db.getData_Id("Song", likedIds).then((data) => {
                return data
            }).catch((err) => {
                console.log(err)
            });
        }
    }
}
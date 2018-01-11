module.exports = {
    Song: {
        id: (source, args, context) => {
            return context.dbIdToNodeId(source.__modelName, source._id);
        },
        album: (source, args, context) => {
            return context.getData_Id("Album", source.albumId).then((data) => {
                if (!Array.isArray(data)) {
                    data = [data]
                }
                return data
            }).catch((err) => {
                console.log(err)
            });
        },
        artists: (source, args, context) => {
            return context.getData_Id("Artist",context.getArtist_SongId).then((data) => {
                if (!Array.isArray(data)) {
                    data = [data]
                }
                return data
            }).catch((err) => {
                console.log(err)
            });
        },
        playlist: (source,args,context) =>{
            return context.getPlaylist_SongId("Playlist",source._id).then((data) =>{
                if(!Array.isArray(data)){
                    data = [data]
                }
                return data
            }).catch((err) => {
                console.log(err)
            });
        }
    }
}
module.exports = {
    Artist: {
        id: (source, args, context) => {
            return context.db.dbIdToNodeId(source.__modelName, source._id);
        },
       
        albums: async (source, args, context) => {
            var albumIds = [];
            //Get Song Of The Artist
            var songId = source.songs.map((s) => {
                return s.song
            });
            //Get AlbumsId Of The Songs Of The Artist
            await context.db.getAlbumId_SongId("Song", songId).then((data) => {
                if (!Array.isArray(data)) {
                    data = [data]
                }
                albumIds = data.slice()
                return data
            }).catch((err) => {
                console.log(err)
            });

            albumIds = albumIds.map((e) => {
                return e.albumId
            })

            albumIds = albumIds.filter((e, p) => {
                return albumIds.indexOf(e) == p;
            })
            //Get The Albums Of the Artist
            return context.db.getData_Id("Album", albumIds).then((data) => {
                if (!Array.isArray(data)) {
                    data = [data]
                }
                return data
            }).catch((err) => {
                console.log(err)
            })
        },

        songs: (source, args, context) => {
            let songIds = source.songs.map((e) => {
                return e.song;
            });
            return context.db.getData_Id("Song", songIds).then((data) => {
                if (!Array.isArray(data)) {
                    data = [data]
                }
                return data
            }).catch((err) => {
                console.log(err)
            });
        },
    }
}
const DataLoader = require('dataloader');
const db = require('../../database/databaseAdapter')
let playlistLoader = new DataLoader((ids)=>{
    return db.getRelsBatch(ids,"User",{label:"CREATED_BY",direction:"IN"},"Playlist")
})
let followedArtistLoader = new DataLoader((ids)=>{
    return db.getRelsBatch(ids,"User", {label:"FOLLOWED",direction:"OUT"}, "Artist");
})
let listenedSongsLoader = new DataLoader((ids)=>{
    return db.getRelsBatch(ids,"User", {label:"LISTENED",direction:"OUT"}, "Song");
})
let likedSongsLoader = new DataLoader((ids)=>{
    return db.getRelsBatch(ids,"User", {label:"LIKED",direction:"OUT"}, "Song");
})
let hatedSongsLoader = new DataLoader((ids)=>{
    return db.getRelsBatch(ids,"User", {label:"HATED",direction:"OUT"}, "Song");
})
module.exports = {
    User: {
            id: (source, args, context, info) => {
                return context.driver.dbIdToNodeId("User",source.id);
            },
            playlists: (source, args, context) => {
                return playlistLoader.load(source.id);
            },
            followedArtists: (source, args, context) => {
                return followedArtistLoader.load(source.id);
            },
            listenedSongs: (source, args, context) => {
                return listenedSongsLoader.load(source.id)
            },
            likedSongs: (source, args, context) => {
                return likedSongsLoader.load(source.id);
            },
            hatedSongs: (source, args, context) => {
                return hatedSongsLoader.load(source.id);
            }
        }
    }
const DataLoader = require('dataloader');
const db = require('./databaseAdapter');

// data loaders with batching & caching
export default function(user){
    return {
        album: {
            artistLoader: new DataLoader((ids) => {
                return db.getRelsBatch(ids,"Album", [
                        {label:"SONG_OF",direction:"IN"},
                        {label:"ARTIST_OF",direction:"IN"}
                    ],"Artist");
            }),
            songLoader: new DataLoader((ids) => {
                return db.getRelsBatch(ids,"Album", {label:"SONG_OF", direction:"IN"}, "Song");
            }),
        },
        artist: {
            albumLoader: new DataLoader((ids)=>{
                return db.getRelsBatch(ids,"Artist",[
                        {label:"ARTIST_OF",direction:"OUT"},
                        {label:"SONG_OF",direction:"OUT"}
                    ],"Album");
            }),
            songLoader: new DataLoader((ids) => {
                return db.getRelsBatch(ids,"Artist", {label:"ARTIST_OF",direction:"OUT"}, "Song");
            }),
            followedByLoader: new DataLoader((ids)=>{
                return db.getRelsBatch(ids,"Artist", {label:"FOLLOWED",direction:"IN"}, "User");
            }),
        },
        playlist: {
            trackLoader: new DataLoader((ids)=>{
                return db.getRelsBatch(ids,"Playlist",{ label: "CONTAINS", direction: "OUT" }, "Song")
            }),
            trackCountLoader: new DataLoader((ids)=>{
                return db.countRelsBatch(ids,"Playlist", { label: "CONTAINS", direction: "OUT" }, "Song");
            }),
        },
        song: {
            albumLoader: new DataLoader((ids)=>{
                return db.getRelsBatch(ids,"Song", {label:"SONG_OF",direction:"OUT"}, "Album");
            }),
            artistLoader: new DataLoader((ids)=>{
                return db.getRelsBatch(ids,"Song", {label:"ARTIST_OF",direction:"IN"}, "Artist");
            }),
            likedByLoader: new DataLoader((ids)=>{
                return db.getRelsBatch(ids,"Song", {label:"LIKED",direction:"IN"}, "User");
            }),
        },
        user: {
            playlistLoader: new DataLoader((ids)=>{
                return db.getRelsBatch(ids,"User",{label:"CREATED_BY",direction:"IN"},"Playlist")
            }),
            followedArtistLoader: new DataLoader((ids)=>{
                return db.getRelsBatch(ids,"User", {label:"FOLLOWED",direction:"OUT"}, "Artist");
            }),
            listenedSongsLoader: new DataLoader((ids)=>{
                return db.getRelsBatch(ids,"User", {label:"LISTENED",direction:"OUT"}, "Song");
            }),
            likedSongsLoader: new DataLoader((ids)=>{
                return db.getRelsBatch(ids,"User", {label:"LIKED",direction:"OUT"}, "Song");
            }),
            hatedSongsLoader: new DataLoader((ids)=>{
                return db.getRelsBatch(ids,"User", {label:"HATED",direction:"OUT"}, "Song");
            })
        }
    }
}
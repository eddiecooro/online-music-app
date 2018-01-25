const DataLoader = require('dataloader');
const db = require('../../database/databaseAdapter')
let albumLoader = new DataLoader((ids)=>{
    return db.getRelsBatch(ids,"Song", {label:"SONG_OF",direction:"OUT"}, "Album");
})
let artistLoader = new DataLoader((ids)=>{
    return db.getRelsBatch(ids,"Song", {label:"ARTIST_OF",direction:"IN"}, "Artist");
})
module.exports = {
    Song: {
        id: (source, args, context) => {
            return context.driver.dbIdToNodeId("Song",source.id);
        },
        album: (source, args, context) => {
            return albumLoader.load(source.id).then((res)=>(res[0]));
        },
        artists: (source, args, context) => {
            return artistLoader.load(source.id); 
        }
    }
}
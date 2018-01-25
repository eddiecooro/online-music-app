const DataLoader = require('dataloader');
const db = require('../../database/databaseAdapter')
let albumLoader = new DataLoader((ids)=>{
    return db.getRelsBatch(ids,"Artist",[
            {label:"ARTIST_OF",direction:"OUT"},
            {label:"SONG_OF",direction:"OUT"}
        ],"Album");
});
let songLoader = new DataLoader((ids) => {
    return db.getRelsBatch(ids,"Artist", {label:"ARTIST_OF",direction:"OUT"}, "Song");
})
module.exports = {
    Artist: {
        id: (source, args, context) => {
            return context.driver.dbIdToNodeId("Artist",source.id);
        },
       
        albums: (source, args, context) => {
            return albumLoader.load(source.id);
        },

        songs: (source, args, context) => {
            return songLoader.load(source.id);
        },
    }
}
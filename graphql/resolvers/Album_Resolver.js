const DataLoader = require('dataloader');
const db = require('../../database/databaseAdapter')
let artistLoader = new DataLoader((ids) => {
    return db.getRelsBatch(ids,"Album", [
            {label:"SONG_OF",direction:"IN"},
            {label:"ARTIST_OF",direction:"IN"}
        ],"Artist");
});
let songLoader = new DataLoader((ids) => {
    return db.getRelsBatch(ids,"Album", {label:"SONG_OF", direction:"IN"}, "Song");
})
module.exports = {
    Album: {
        id: (source, args, context) => {
            return context.driver.dbIdToNodeId("Album",source.id);
        },
        songs: (source, args, context) => {
            return songLoader.load(source.id);
        },
        artists: (source, args, context) => {
            return artistLoader.load(source.id);
        }
    }
}

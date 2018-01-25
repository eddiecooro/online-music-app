const DataLoader = require('dataloader');
const db = require('../../database/databaseAdapter')
let trackLoader = new DataLoader((ids)=>{
    return db.getRelsBatch(ids,"Playlist",{ label: "CONTAINS", direction: "OUT" }, "Song")
})
let trackCountLoader = new DataLoader((ids)=>{
    return db.countRelsBatch(ids,"Playlist", { label: "CONTAINS", direction: "OUT" }, "Song");
})
module.exports = {

    Playlist: {
        //Get Id From NodeId
        id: (source, args, context) => {
            return context.driver.dbIdToNodeId("Playlist", source.id);
        },

        tracks: (source, args, context) => {
            return trackLoader.load(source.id);
            // return context.driver.getRels(source, { label: "CONTAINS", direction: "OUT" }, "Song");
        },

        trackCount: (source, args, context) => {
            return trackCountLoader.load(source.id);
        }
    }
}
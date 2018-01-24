module.exports = {

    Playlist: {
        //Get Id From NodeId
        id: (source, args, context) => {
            return context.driver.dbIdToNodeId("Playlist", source.id);
        },

        tracks: (source, args, context) => {
            return context.driver.getRels(source, { label: "CONTAINS", direction: "OUT" }, "Song");
        },

        trackCount: (source, args, context) => {
            return context.driver.countRels(source, { label: "CONTAINS", direction: "OUT" }, "Song").then((data)=>{return data[0].count});
        }
    }
}
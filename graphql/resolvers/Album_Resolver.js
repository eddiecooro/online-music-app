module.exports = {
    Album: {
        id: (source, args, context) => {
            return context.driver.dbIdToNodeId("Album",source.id);
        },
        songs: (source, args, context) => {
            return context.driver.getRels(source,"SONG_OF","IN", "Song");
        },
        artists: async (source, args, context) => {
            let targetType = "Artist";
            let cypher = `
                MATCH (n:${source.__label})<-[:SONG_OF]-()<-[:ARTIST_OF]-(a:${targetType})
                WHERE ID(n) = ${source.id}
                RETURN a
            `
            return new Promise((resolve,reject)=>{
                context.driver.query(cypher,(err,nodes)=>{
                    if(err) reject(err);
                    nodes.forEach((node)=>{
                        node.__label = targetType;
                    })
                    resolve(nodes);
                });
            })
        }
    }
}

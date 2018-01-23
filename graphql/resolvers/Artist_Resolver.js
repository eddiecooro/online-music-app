module.exports = {
    Artist: {
        id: (source, args, context) => {
            return context.driver.dbIdToNodeId("Artist",source.id);
        },
       
        albums: (source, args, context) => {
            let targetType = "Album";
            let cypher = `
                MATCH (n:${source.__label})-[:ARTIST_OF]->()-[:SONG_OF]->(a:${targetType})
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
        },

        songs: (source, args, context) => {
            return context.driver.getRels(source,"ARTIST_OF","OUT", "Artist");       
        },
    }
}
function dbIdToNodeId(label, id){
    return label + ":" + id;
}
module.exports = {
    User: {
            id: (source, args, context, info) => {
                return dbIdToNodeId("User",source.id);
            },
            playlists: (source, args, context) => {
                return new Promise((resolve,reject)=>{
                    context.driver.query(cypher,(err,node)=>{
                        if(err) reject(err);
                        node = node[0];
                        node.__label = label;
                        resolve(node);
                    })
                })
            },
            songs: (source, args, context) => {
            },
            followedArtists: (source, args, context) => {
            },
            listenedSongs: (source, args, context) => {
            },
            likedSongs: (source, args, context) => {
            },
            hatedSongs: (source, args, context) => {
            }
        }
    }
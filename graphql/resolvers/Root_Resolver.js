import {neo4jgraphql} from 'neo4j-graphql-js';
function nodeIdToDbId(id){
    return id.split(":");
}
module.exports = {
    //Root Query
    Query: {
        node: (source, args, context, info) => {
            let [label, id] = nodeIdToDbId(args.id);
            let cypher = `MATCH (node:${label}) WHERE ID(node) = ${id} RETURN node`
            return new Promise((resolve,reject)=>{
                context.driver.query(cypher,(err,node)=>{
                    if(err) reject(err);
                    node = node[0];
                    node.__label = label;
                    resolve(node);
                })
            })
        },
        search: (source, args, context)=>{
            let modelsToSearch = ["User","Playlist","Song","Artist","Album"];
            return db.search(modelsToSearch,args.text).then((data)=>{
                return data;
            }).catch((err)=>{
                console.log(err);
            });
        },
        viewer: (source,args,context)=>{
            if(context.user){
                context.user.__modelName = "User";
                return context.user;
            } else {
                return null
            }
        }
    },
    //Specify Which Resolve Should Go
    Node: {
        __resolveType(source, context, info) {
            return source.__label
        }
    },
   

}
module.exports = {
    //Root Query
    Query: {
        node: (source, args, context, info) => {
            let [label, id] = context.driver.nodeIdToDbId(args.id);
            let cypher = `MATCH (node:${label}) WHERE ID(node) = ${id} RETURN node`
            return new Promise((resolve,reject)=>{
                context.driver.query(cypher,(err,node)=>{
                    if(err){
                        reject(err);
                    } else {
                        node = node[0];
                        if(!node){
                            reject(label + " with Id: " + id + " not found");
                        } else {
                            node.__label = label;
                            resolve(node);
                        }
                    }
                })
            })
        },
        search: (source, args, context)=>{
            let modelsToSearch = ["User","Playlist","Song","Artist","Album"];
            return context.driver.search(modelsToSearch,args.text).then((data)=>{
                return data;
            }).catch((err)=>{
                console.log(err);
            });
        },
        viewer: (source,args,context)=>{
            if(context.user){
                context.user.__label = "User";
                return context.user;
            } else {
                return null
            }
        },
    },
    //Specify Which Resolve Should Go
    Node: {
        __resolveType(source, context, info) {
            return source.__label
        }
    },
   

}
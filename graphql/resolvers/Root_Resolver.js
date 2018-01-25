module.exports = {
    //Root Query
    Query: {
        node: (source, args, ctx, info) => {
            let [label, id] = ctx.driver.nodeIdToDbId(args.id);
            let cypher = `MATCH (node:${label}) WHERE ID(node) = ${id} RETURN node`
            return new Promise((resolve,reject)=>{
                ctx.driver.query(cypher,(err,node)=>{
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
        search: (source, args, ctx)=>{
            let modelsToSearch = ["User","Playlist","Song","Artist","Album"];
            return ctx.driver.search(modelsToSearch,args.text).then((data)=>{
                return data;
            }).catch((err)=>{
                console.log(err);
            });
        },
        viewer: (source,args,ctx)=>{
            if(ctx.user){
                ctx.user.__label = "User";
                return ctx.user;
            } else {
                return null
            }
        },
    },
    //Specify Which Resolve Should Go
    Node: {
        __resolveType(source, ctx, info) {
            return source.__label
        }
    },
   

}
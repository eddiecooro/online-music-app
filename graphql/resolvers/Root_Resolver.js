module.exports = {
    //Root Query
    Query: {
        //Every Type Is A Node
        //NodeID like => User:fj392739872dk
        node: (source, args, context) => {
            return context.db.getData_Id(...context.db.nodeIdToDbId(args.id)).then((data) => {
                return data;
            }).catch((err) => {
                console.log(err);
            });
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
            return source.__modelName;
        }
    },
   

}
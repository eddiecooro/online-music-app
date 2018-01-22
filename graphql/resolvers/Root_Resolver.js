import {neo4jgraphql} from 'neo4j-graphql-js';

module.exports = {
    //Root Query
    Query: {
        node: (source, args, context) => {
            return neo4jgraphql(source, args, context, info);
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
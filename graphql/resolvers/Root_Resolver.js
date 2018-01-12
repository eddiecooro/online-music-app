const helper = require('./ResolverHelper');
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

        viewer: (source, args, context) => {
            if (context.db.user) {
                context.db.user.__modelName = "User";
                return context.db.user;
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
    UserSongEdge: {
        node: (source, args, context) => {
            return source
        },
        cursor: (source,args,context) => {
            // console.log(source.id.toString())
            return helper.IdToCursor(source._id.toString())
        }
    },
    PageInfo: {
        hasNextPage: (source,args,context)=>{
            return source.NextPage
        },
        hasPreviousPage: (source,args,context)=>{
            return source.PreviousPage
        }
    },
    UserSongConnection: {
        edges: (source, args, context) => {
            return source.result
           
        },
        pageInfo: (source,args,context) =>{
            console.log(source)
            return {NextPage:source.hasNextPage,
            PreviousPage: source.hasPreviousPage
            }
        }
    }

}
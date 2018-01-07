const graphql = require('graphql');
const User = require('../models/User.js');

var userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        id: {
            type: graphql.GraphQLID
        },
        username: {
            type: graphql.GraphQLString
        },
        password: {
            type: graphql.GraphQLString
        },
        email: {
            type: graphql.GraphQLString
        },
        avatar: {
            type: graphql.GraphQLString
        },
        gender: {
            type: graphql.GraphQLString
        }
    }
});

var userAdd = {
    type: userType,
    description: 'Add a user to Database',
    args: {
        username: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        password: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)            
        },
        email: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)            
        },
        avatar: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)            
        },
        gender: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)            
        }
    },
    resolve: (root, args) => {
        var user = new User({
            username: args.username,
            password: args.password,
            email: args.email,
            avatar: args.avatar,
            // nickname: args.nickname,
            gender: args.gender,
            // age: args.age,
            // playlist: args.playlist,
            // followedArtist: args.followedArtist,
        });
        return new Promise((resolve, reject)=>{
            user.save().then((user)=>{
                resolve(user);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
};

var userUpdate = {
    type: userType,
    args: {
        id: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLID)
        },
        username: {
            type: graphql.GraphQLString
        },
        password: {
            type: graphql.GraphQLString         
        },
        email: {
            type: graphql.GraphQLString            
        },
        avatar: {
            type: graphql.GraphQLString            
        },
        gender: {
            type: graphql.GraphQLString            
        }
    },
    resolve: (root, args) => {
        var user = User.find({_id: args.id});
        updatedUser = {
            id: user._id,
            username: args.username || user.username,
            password: args.password || user.password,
            email: args.email || user.email,
            avatar: args.avatar || user.avatar,
            // nickname: args.nickname,
            gender: args.gender || user.gender,
            // age: args.age,
            // playlist: args.playlist,
            // followedArtist: args.followedArtist,
        }
        return new Promise((resolve, reject)=>{
            user.update(updatedUser).then(()=>{
                resolve(user._update);
            }).catch((err)=>{
                reject(err);
            });
        })
       
    }
}

var userDelete = {
    type: graphql.GraphQLInt,
    args: {
        id: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLID)
        },
    },
    resolve: (root,args)=>{
        user = User.findById(args.id);
        return new Promise((resolve, reject)=>{
            user.remove({_id: args.id}).then((status)=>{
                resolve(status.n);
            }).catch((err)=>{
                reject(err);
            });
        })
    }
}

var queryUser = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        get: {
            type: graphql.GraphQLList(userType),
            resolve: function() {
                return new Promise( (resolve, reject) =>{
                    console.log("not Working?")
                    User.find().then( (users)=>{
                        resolve(users)
                    }).catch( (err) => {reject(err)});
                }) 
            }
        }
    }
});

var mutationUesr = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        add: userAdd,
        update: userUpdate,
        delete: userDelete
    }
});

module.exports = new graphql.GraphQLSchema({
    query: queryUser,
    mutation: mutationUesr
})
import {merge} from 'lodash'
import {makeExecutableSchema} from 'graphql-tools';
const Root_Resolve = require('./resolvers/Root_Resolver');
const User_Resolve = require('./resolvers/User_Resolver');
const Song_Resolve = require('./resolvers/Song_Resolver');
const Playlist_Resolve = require('./resolvers/Playlist_Resolver');
const Artist_Resolve = require('./resolvers/Artist_Resolver');
const Album_Resolve = require('./resolvers/Album_Resolver');
const Root_Mutation = require('./mutations/Root_Mutation');
import {typeDefs} from './typeDefs';

var resolvers = merge(Root_Resolve,
    User_Resolve,
    Song_Resolve,
    Playlist_Resolve,
    Artist_Resolve,
    Album_Resolve,
    Root_Mutation
)
    
export default makeExecutableSchema({
    typeDefs,
    resolvers
})
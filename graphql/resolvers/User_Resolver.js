import {neo4jgraphql} from 'neo4j-graphql-js';

module.exports = {
    User: {
            id: (source, args, context, info) => {
                return neo4jgraphql(source, args, context, info);
            },
            playlists: (source, args, context) => {
                return neo4jgraphql(source, args, context, info);
            },
            songs: (source, args, context) => {
                return neo4jgraphql(source, args, context, info);
            },
            followedArtists: (source, args, context) => {
                return neo4jgraphql(source, args, context, info);
            },
            listenedSongs: (source, args, context) => {
                return neo4jgraphql(source, args, context, info);
            },
            likedSongs: (source, args, context) => {
                return neo4jgraphql(source, args, context, info);
            },
            hatedSongs: (source, args, context) => {
                return neo4jgraphql(source, args, context, info);
            }
        }
    }
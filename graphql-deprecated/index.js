import {GraphQLSchema} from 'graphql';
import {RootQuery} from './queries';
import {
    UserType,
    ArtistType,
    AlbumType,
    PlaylistType,
    SongType
} from './types';

export default new GraphQLSchema({
    types: [UserType,ArtistType,AlbumType,SongType,PlaylistType],
    query: RootQuery
});
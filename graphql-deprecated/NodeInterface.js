import {
    UserType,
    ArtistType,
    AlbumType,
    PlaylistType,
    SongType
} from './types';
import {
    GraphQLInterfaceType,
    GraphQLNonNull,
    GraphQLID,
} from 'graphql';

export const NodeInterface = new GraphQLInterfaceType({
    name: 'Node',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolveType: (source) => {
        switch(source.__modelName){
            case "User":
                return UserType;
                break;
            case "Album":
                return AlbumType;
                break;
            case "Artist":
                return ArtistType;
                break;
            case "Playlist":
                return PlaylistType;
                break;
            case "Song":
                return SongType;
                break;
        }
        return null;
    }
});
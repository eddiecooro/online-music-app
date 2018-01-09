import * as types from './types';
import {
    GraphQLInterfaceType,
} from 'graphql';

export const nodeInterface = new GraphQLInterfaceType({
    name: 'Node',
    resolveType: (source) =>{
        switch(source.__modelName){
            case "User":
                return types.UserType;
                break;
            case "Album":
                return types.AlbumType;
                break;
            case "Artist":
                return types.ArtistType;
                break;
            case "Playlist":
                return types.PlaylistType;
                break;
            case "Song":
                return types.SongType;
                break;
        }
        return null;
    }
});
import {merge} from "lodash";

import RootResolver from './RootResolver';
import UserResolver from './UserResolver';
import SongResolver from './SongResolver';
import PlaylistResolver from './PlaylistResolver';
import ArtistResolver from './ArtistResolver';
import AlbumResolver from './AlbumResolver';
import RootMutation from './RootMutationResolver';

const resolvers = merge(
    RootResolver,
    UserResolver,
    SongResolver,
    PlaylistResolver,
    ArtistResolver,
    AlbumResolver,
    RootMutation
)

export default resolvers;
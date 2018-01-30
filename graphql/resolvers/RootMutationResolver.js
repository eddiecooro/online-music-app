import UserMutations from "./mutations/UserMutations";
import ArtistMutations from "./mutations/ArtistMutations";
import SongMutations from "./mutations/SongMutations";
import AlbumMutations from "./mutations/AlbumMutations";
import PlaylistMutations from "./mutations/PlaylistMutations";

module.exports = {
    Mutation: {
        login:(source,{username,password},ctx)=>{
            return ctx.login(username,password);
        },
        ...UserMutations,
        ...ArtistMutations,
        ...SongMutations,
        ...AlbumMutations,
        ...PlaylistMutations
    }
}
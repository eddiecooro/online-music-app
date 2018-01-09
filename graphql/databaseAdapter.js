import mongoose from 'mongoose';
import * as models from '../models';

export const getPlaylists = async (ids) => {
    ids = ids.map((id)=>{
        return mongoose.Types.ObjectId(id);
    });
    return await models.Playlist.find({'_id': {$in: ids}});
};

export const getArtists = async (ids) => {
    ids = ids.map((id)=>{
        return mongoose.Types.ObjectId(id);
    });
    return await models.Artist.find({'_id': {$in: ids}});
};

export const getSongs = async (ids) => {
    ids = ids.map((id)=>{
        return mongoose.Types.ObjectId(id);
    });
    return await models.Song.find({'_id': {$in: ids}});
}
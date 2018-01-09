import mongoose from 'mongoose';
import * as models from '../models';

export const dbIdToNodeId = (tableName, dbId)=>{
    return `${tableName}:${dbId}`;
};

const makeSureIsArray = (e) => {
    if(Array.isArray(e)){
        return e;
    } else {
        return [e];
    }
};

export const getData = async (ids,ModelName) => {
    makeSureIsArray(ids);
    ids = ids.map((id)=>{
        return mongoose.Types.ObjectId(id);
    });
    return await models.ModelName.find({'_id': {$in: ids}});
};

// export const getArtists = async (ids) => {
//     makeSureIsArray(ids);    
//     ids = ids.map((id)=>{
//         return mongoose.Types.ObjectId(id);
//     });
//     return await models.Artist.find({'_id': {$in: ids}});
// };

// export const getSongs = async (ids) => {
//     makeSureIsArray(ids);    
//     ids = ids.map((id)=>{
//         return mongoose.Types.ObjectId(id);
//     });
//     return await models.Song.find({'_id': {$in: ids}});
// }

// export const getAlbums = async (ids) => {
//     makeSureIsArray(ids);    
//     ids = ids.map((id)=>{
//         return mongoose.Types.ObjectId(id);
//     });
//     return await models.Album.find({'_id': {$in: ids}});
// }
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

// Gets a modelName and array of ids and return a promise(because this is an async function)
// That resolves by an array of jsons from the model specified by modelName
export const getData = async (ids,modelName) => {
    makeSureIsArray(ids);
    let model = getModelByName(modelName);
    ids = ids.map((id)=>{
        return mongoose.Types.ObjectId(id);
    });
    return await models[modelName].find({'_id': {$in: ids}});
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
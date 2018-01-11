import mongoose from 'mongoose';
import * as models from '../models';

export const dbIdToNodeId = (tableName, dbId)=>{
    return `${tableName}:${dbId}`;
};

export const nodeIdToDbId = (nodeId) => {
    return nodeId.split(":");
}

const makeSureIsArray = (e) => {
    if(Array.isArray(e)){
        return e;
    } else {
        return [e];
    }
};

// Gets a modelName and array of ids and return a promise(because this is an async function)
// That resolves by an array of jsons from the model specified by modelName
export const getData_Id = async (modelName,ids) => {
    
    ids = makeSureIsArray(ids);
    
    // if(typeof ids[0] !== "object"){
    ids = ids.map((id)=>{
        return mongoose.Types.ObjectId(id);
    });
    // }
    // else{
    //     console.log(ids)
    //     ids = ids.map((id) =>{

    //         return mongoose.Types.ObjectId(id._id)
    //     })
    // }

    let elements = await models[modelName].find({'_id': {$in: ids}});


    elements = elements.map((e)=>{
        e = e.toObject();
        e.__modelName = modelName;
        return e;
    });

    return elements.length == 1 ? elements[0] : elements;
};

export const getSong_AlbumId = async (modelName,ids) =>{
  
    ids = makeSureIsArray(ids);
    
    // if(typeof ids[0] !== "object"){
    console.log(ids)
    ids = ids.map((id)=>{
        return mongoose.Types.ObjectId(id);
    });
    // }

    // else{
    //     console.log(ids)
    //     ids = ids.map((id) =>{

    //         return mongoose.Types.ObjectId(id._id)
    //     })
    // }
    let elements = await models[modelName].find({'albumId' : {$in: ids}});

    elements = elements.map((e)=>{
        e = e.toObject();
        e.__modelName = modelName;
        return e;
    });

    return elements.length == 1 ? elements[0] : elements;
};


export const getSongId_AlbumId = async (modelName,ids) =>{
  
    ids = makeSureIsArray(ids);
    
    // if(typeof ids[0] !== "object"){

    ids = ids.map((id)=>{
        return mongoose.Types.ObjectId(id);
    });
    // }

    // else{
    //     console.log(ids)
    //     ids = ids.map((id) =>{

    //         return mongoose.Types.ObjectId(id._id)
    //     })
    // }
    let elements = await models[modelName].find({'albumId' : {$in: ids}},{'_id' : 1});

    elements = elements.map((e)=>{
        e = e.toObject();
        e.__modelName = modelName;
        return e;
    });

    return elements.length == 1 ? elements[0] : elements;
};


export const getArtist_SongId = async (modelName,ids) =>{
  
    ids = makeSureIsArray(ids);
    
    // if(typeof ids[0] !== "object"){

    ids = ids.map((id)=>{
        return mongoose.Types.ObjectId(id);
    });
    // }

    // else{
    //     console.log(ids)
    //     ids = ids.map((id) =>{

    //         return mongoose.Types.ObjectId(id._id)
    //     })
    // }
    let elements = await models[modelName].find({ 'songs' : {$elemMatch : { 'song' : {$in : ids} }}});

    elements = elements.map((e)=>{
        e = e.toObject();
        e.__modelName = modelName;
        return e;
    });

    return elements.length == 1 ? elements[0] : elements;
};


export const getAlbumId_SongId = async (modelName,ids) =>{
  
    ids = makeSureIsArray(ids);
    
    // if(typeof ids[0] !== "object"){

    ids = ids.map((id)=>{
        return mongoose.Types.ObjectId(id);
    });
    // }

    // else{
    //     console.log(ids)
    //     ids = ids.map((id) =>{

    //         return mongoose.Types.ObjectId(id._id)
    //     })
    // }
    let elements = await models[modelName].find({ '_id': { $in: songId } }, { 'albumId': 1 });

    elements = elements.map((e)=>{
        e = e.toObject();
        e.__modelName = modelName;
        return e;
    });

    return elements.length == 1 ? elements[0] : elements;
};



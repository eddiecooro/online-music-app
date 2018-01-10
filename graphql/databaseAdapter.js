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
export const getData = async (modelName,ids ) => {
    ids = makeSureIsArray(ids);
    if(typeof ids[0] !== "object"){
    ids = ids.map((id)=>{
        return mongoose.Types.ObjectId(id);
    });
    }
    else{
        ids = ids.map((id) =>{
            return mongoose.Types.ObjectId(id._id)
        })
    }
    let elements = await models[modelName].find({'_id': {$in: ids}});
    makeSureIsArray(elements)
    elements = elements.map((e)=>{
        e = e.toObject();
        e.__modelName = modelName;
        return e;
    });
    return elements.length == 1 ? elements[0] : elements;
};
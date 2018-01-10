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
export const getData = async (modelName,ids) => {
    ids = makeSureIsArray(ids);
    console.log("This Is What You Want:\t\t\t" + ids)
    var new_ids = ids.map((id)=>{
        return mongoose.Types.ObjectId(id);
    });
    console.log("This Is What You Want:\t\t\t" + new_ids)
    let elements = []
    for (let e of new_ids){
         let result = await models[modelName].find(e)
        elements.push(result)
        
    }
    // let elements = await models[modelName].find({'_id': {$in: ids}});
    elements = elements.map((e)=>{
        // e = e.toObject();
        e.__modelName = modelName;
        return e;
    });
    return elements.length == 1 ? elements[0] : elements;
};
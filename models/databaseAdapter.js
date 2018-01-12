import mongoose from 'mongoose';
import * as models from '../models';

export const dbIdToNodeId = (tableName, dbId) => {
    return `${tableName}:${dbId}`;
};

export const nodeIdToDbId = (nodeId) => {
    return nodeId.split(":");
}

const makeSureIsArray = (e) => {
    if (Array.isArray(e)) {
        return e;
    } else {
        return [e];
    }
};

// Gets a modelName and array of ids and return a promise(because this is an async function)
// That resolves by an array of jsons from the model specified by modelName
export const getData_Id = async (modelName, ids) => {
    ids = makeSureIsArray(ids);

    // if(typeof ids[0] !== "object"){
    ids = ids.map((id) => {
        return mongoose.Types.ObjectId(id);
    });
    // }
    // else{
    //     console.log(ids)
    //     ids = ids.map((id) =>{

    //         return mongoose.Types.ObjectId(id._id)
    //     })
    // }

    let elements = await models[modelName].find({ '_id': { $in: ids } });


    elements = elements.map((e) => {
        e = e.toObject();
        e.__modelName = modelName;
        return e;
    });

    return elements.length == 1 ? elements[0] : elements;
};

export const getSong_AlbumId = async (modelName, ids) => {

    ids = makeSureIsArray(ids);

    // if(typeof ids[0] !== "object"){
    console.log(ids)
    ids = ids.map((id) => {
        return mongoose.Types.ObjectId(id);
    });
    // }

    // else{
    //     console.log(ids)
    //     ids = ids.map((id) =>{

    //         return mongoose.Types.ObjectId(id._id)
    //     })
    // }
    let elements = await models[modelName].find({ 'albumId': { $in: ids } });

    elements = elements.map((e) => {
        e = e.toObject();
        e.__modelName = modelName;
        return e;
    });

    return elements.length == 1 ? elements[0] : elements;
};


export const getSongId_AlbumId = async (modelName, ids) => {

    ids = makeSureIsArray(ids);

    // if(typeof ids[0] !== "object"){

    ids = ids.map((id) => {
        return mongoose.Types.ObjectId(id);
    });
    // }

    // else{
    //     console.log(ids)
    //     ids = ids.map((id) =>{

    //         return mongoose.Types.ObjectId(id._id)
    //     })
    // }
    let elements = await models[modelName].find({ 'albumId': { $in: ids } }, { '_id': 1 });

    elements = elements.map((e) => {
        e = e.toObject();
        e.__modelName = modelName;
        return e;
    });

    return elements.length == 1 ? elements[0] : elements;
};


export const getArtist_SongId = async (modelName, ids) => {

    ids = makeSureIsArray(ids);

    // if(typeof ids[0] !== "object"){

    ids = ids.map((id) => {
        return mongoose.Types.ObjectId(id);
    });
    // }

    // else{
    //     console.log(ids)
    //     ids = ids.map((id) =>{

    //         return mongoose.Types.ObjectId(id._id)
    //     })
    // }
    let elements = await models[modelName].find({ 'songs': { $elemMatch: { 'song': { $in: ids } } } });

    elements = elements.map((e) => {
        e = e.toObject();
        e.__modelName = modelName;
        return e;
    });

    return elements.length == 1 ? elements[0] : elements;
};

export const getAlbumId_SongId = async (modelName, ids) => {

    ids = makeSureIsArray(ids);

    // if(typeof ids[0] !== "object"){

    ids = ids.map((id) => {
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

    elements = elements.map((e) => {
        e = e.toObject();
        e.__modelName = modelName;
        return e;
    });

    return elements.length == 1 ? elements[0] : elements;
};

export const getPlaylist_SongId = async (modelName, ids) => {


    let elements = await models[modelName].find({ 'tracks': ids })
    elements = elements.map((e) => {
        e = e.toObject();
        e.__modelName = modelName;
        return e;
    });
    return elements.length == 1 ? elements[0] : elements;
}

// Args: 
//    modelNames: models to search between
//    text: text to search inside models
// Returns:
//    search results from models sorted by search score
export const search = async (modelNames, text) => {
    let results = [];
    let resultPromises = [];

    modelNames.forEach(async (mName) => {
        try {
            let model = models[mName];
            resultPromises.push(model.find({ $text: { $search: text } }, { score: { $meta: "textScore" } }).then((datas) => {
                datas.forEach((data) => {
                    data.__modelName = mName;
                    results.push(data);
                });
            }));
        } catch (e) {
            console.log(e);
        }
    });
    return Promise.all(resultPromises).then(() => {
        results = results.sort((a, b) => {
            return (a.score > b.score);
        })
        return results;
    })
}

export const Get_Limited_After_Data = (modelName, first, last, after) => {

    const filter = {
        _id: {},
    };

    if (after) {
        const op = '$gt';
        filter._id[op] = ObjectId(after.value);
    }

    return models[modelName].find(filter);

}

export const Paginetion = async (sourceModelName, targetModelName, id, first, last) => {
    var ids = await models[sourceModelName].find({ '_id': id }, { songsRels: 1 }).then((data) => {
        return data
    }).catch((err) => {
        console.log(err)
    })
    ids = ids[0].songsRels.map((e) => {
        return mongoose.Types.ObjectId(e.songId)
    })
    var elements = []
    let count = 0;
    let skip = 0;
    let limit = 0;

    if (first || last) {
        elements = await models[targetModelName].find({ '_id': { $in: ids } })
        count = elements.length
        limit = count

        if (first && count > first) {
            limit = first
        }

        if (last) {
            if (limit && limit > last) {
                skip = limit - last;
                limit -= skip;
            }
            else if (!limit && count > last) {
                skip = count - last
            }
        }

    }

    await Data_Paigention_Findig(limit, skip, targetModelName, ids).then((data) => {

        elements = data.slice()

        return data
    })
    elements = elements.map((e) => {
        e = e.toObject();
        e.__modelName = targetModelName;
        return e;
    });
    return {
        result: elements.length == 1 ? elements[0] : elements,
        hasNextPage: (first && count > first),
        hasPreviousPage: (last && count > last)

    }

}


function Data_Paigention_Findig(limit, skip, targetModelName, ids) {
    if (limit != 0) {
        return models[targetModelName].find({ '_id': { $in: ids } }).skip(skip).limit(limit).then((data) => {
            return data
        })
    }
    else {
        return models[targetModelName].find({ '_id': { $in: ids } }).then((data) => {
            return data
        })
    }
}

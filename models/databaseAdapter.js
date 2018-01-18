import mongoose from 'mongoose';
import * as models from '../models';
var cursorFunc = require('./')
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

export function CursorToId(input) {
    return new Buffer(input, 'base64').toString("binary")
}
export function IdToCursor(input) {
    return new Buffer(input, 'binary').toString("base64")
}

export const Paginetion = async (sourceModelName, targetModelName, id, args) => {



    // let cursors = ids[0].songsRels.forEach((e) => {
    //     return IdToCursor(mongoose.Types.ObjectId(e._Id).toString())
    // })

    // let songIds = ids[0].songsRels.map((e) => {
    //     return mongoose.Types.ObjectId(e.songId)
    // })
    let hasNextPage = false;
    let hasPreviousPage = false;

    var ids = await models[sourceModelName].find({ '_id': id }, { songsRels: 1 })
    ids = ids[0].songsRels

    if (args.before || args.after) {
        for (let i = 0; i < ids.length; i++) {


            if (args.after && args.after == ids[i]._id) {
                ids = ids.slice(i + 1)
            }
            if (args.before && args.before == ids[i]._id) {
                ids = ids.slice(0, i)
                break
            }
        }
    }

    // eval(require('locus'))
    console.log(ids+"\n\n\n\n\n\n")
    if (args.first || args.last) {
        if (args.first && args.first < ids.length) {
            hasNextPage = true
            ids = ids.slice(0, args.first)
        }
        if (args.last && args.last < ids.length) {
            hasPreviousPage = true
            ids = ids.slice(ids.length - args.last)
        }
    }
    console.log(ids+"\n\n\n\n\n\n")

    let songIds = ids.map((e) => {
        return mongoose.Types.ObjectId(e.songId)
    })



    var elements = await models[targetModelName].find({ '_id': { $in: songIds } })
    console.log(elements.map((e)=>{return e._id})+"\n\n\n\n\n\n")
    
    let counter = 0
    for (var i = 0; i < songIds.length; i++) {
        if (elements[i]._id.toString() == songIds[0]) {

            let temp = elements[counter];
            elements[counter] = elements[i];
            elements[i] = temp;
            songIds.splice(0, 1)
            counter++;
                        
        }
    }
    console.log(elements.map((e)=>{
        return e._id
    }))
    
    // var elements = []
    // let count = 0;
    // let skip = 0;
    // let limit = 0;
    // let first = args.first
    // let last = args.last
    // let before;
    // let after;
    // if (args.before) {
    //     before = mongoose.Types.ObjectId(args.before)
    // }
    // if (args.after) {
    //     after = mongoose.Types.ObjectId(args.after)
    // }

    // if (first || last) {
    //     count = await models[targetModelName].find({ '_id': { $in: songIds } }).count()
    //     limit = count

    //     if (first && count > first) {
    //         limit = first
    //     }

    //     if (last) {
    //         if (limit && limit > last) {
    //             skip = limit - last;
    //             limit -= skip;
    //         }
    //         else if (!limit && count > last) {
    //             skip = count - last
    //         }
    //     }
    // }
    // elements = await getData_Limitation(before, after, limit, skip, targetModelName, songIds).slice()
    elements = elements.map((e, i) => {
        e = e.toObject();
        e.__modelName = targetModelName;
        e.__cursor = IdToCursor(ids[i]._id.toString());
        return e;
    });
    return {
        result: elements.length == 1 ? elements[0] : elements,
        hasNextPage: hasNextPage,
        hasPreviousPage: hasPreviousPage
    }

}

// function getData_Limitation(before, after, limit, skip, targetModelName, ids) {
//     if (before) {
//         if (after) {
//             if (limit != 0) {
//                 return models[targetModelName].find({ '_id': { $gt: after, $lt: before, $in: ids } }).skip(skip).limit(limit).then((data) => {
//                     return data
//                 })
//             } else {
//                 return models[targetModelName].find({ '_id': { $gt: after, $lt: before, $in: ids } }).skip(skip).then((data) => {
//                     return data
//                 })
//             }
//         }
//         else {
//             if (limit != 0) {
//                 return models[targetModelName].find({ '_id': { $lt: before, $in: ids } }).skip(skip).limit(limit).then((data) => {
//                     return data
//                 })
//             } else {
//                 return models[targetModelName].find({ '_id': { $lt: before, $in: ids } }).skip(skip).then((data) => {
//                     return data
//                 })
//             }
//         }
//     }
//     else {
//         if (after) {
//             if (limit != 0) {
//                 return models[targetModelName].find({ '_id': { $gt: after, $in: ids } }).skip(skip).limit(limit).then((data) => {
//                     return data
//                 })
//             } else {

//                 return models[targetModelName].find({ '_id': { $gt: after, $in: ids } }).skip(skip).then((data) => {
//                     return data
//                 })
//             }
//         }
//         else {
//             if (limit != 0) {
//                 return models[targetModelName].find({ '_id': { $in: ids } }).skip(skip).limit(limit).then((data) => {
//                     return data
//                 })
//             } else {
//                 return models[targetModelName].find({ '_id': { $in: ids } }).skip(skip).then((data) => {
//                     return data
//                 })
//             }
//         }
//     }
// }


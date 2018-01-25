var dbConfig = require('./databaseConfig')
var db = require('seraph')({server: dbConfig.url+":"+dbConfig.port})
const _ = require('lodash')




// Helper functions
// -----------------------------

// By taking an array of rel objects, returns cypher rel query
//   associate with those rels
function makeCypherRels(rels){    
    rels = rels.map((rel)=>{
        let cypher = ``;
        if(rel.direction == "IN"){
            cypher += `<-[${rel.label}]-`;
        } else if(rel.direction == "OUT") {
            cypher += `-[${rel.label}]->`;
        }
        return cypher;
    }).join("()");
    return rels;
}

// Arguments:
//   res: array of result arrays. one array for each node result set
//   label: __label to add to each result
function labelResult(res,label){
    res.forEach((r)=>{
        r.forEach((obj)=>{
            obj.__label = label;
        })
    });
    return res;
}

// Arguments:
//   res([Object]): each object should have an id field
//   ids(Array): array of ids.
// Sorting res objects according to ids array order
function sortResult(res,ids){
    res.sort((a,b)=>{
        return ids.indexOf(a.id) - ids.indexOf(b.id);
    })
    return res;

}
// -----------------------------




// converts seraph cypher query to promise
db.cypherPromise = function(cypherQuery){
    return new Promise((resolve,reject)=>{
        this.query(cypherQuery,(err,result)=>{
            if(err) reject(err);
            resolve(result);
        });
    })
}

db.dbIdToNodeId = function(label, id){
    return label + ":" + id;
}
db.nodeIdToDbId = function(id){
    return id.split(":");
}

// Arguments: 
//   ids(Array): List of all starting node ids
//   sourceLabel(String): starting nodes label.
//   rels([Object]): array of rel objects. each rel object should have both label and direction fields
//     example: {label: "SONG_OF",direction: "OUT"}
//   targetType(String): type of node to return
// Returns:
//   a promise that resolves by an array of database results
db.getRelsBatch = function(ids,sourceLabel,rels,targetType){
    // making sure rels is an array
    rels = Array.isArray(rels) ? rels : [rels];
    let cypherRels = makeCypherRels(rels);
    let cypher = `
        MATCH (n:${sourceLabel})${cypherRels}(t:${targetType})
        WHERE ID(n) IN [${ids}]
        RETURN COLLECT(t) AS data,ID(n) AS id
    `
    
    return this.cypherPromise(cypher).then((res)=>{
        return sortResult(res,ids)
    }).then((res)=>{
        return res.map((r)=>r.data);
    }).then((res)=>{
        return labelResult(res,targetType)
    });
}

// such as getRelsBatch function, but returns count of targets instead
//  of targets
db.countRelsBatch = function(ids,sourceLabel,rels,targetType){
    // making sure rels is an array
    rels = Array.isArray(rels) ? rels : [rels];
    let cypherRels = makeCypherRels(rels);
    let cypher = `
        MATCH (n:${sourceLabel})${cypherRels}(t:${targetType})
        WHERE ID(n) IN [${ids}]
        RETURN COUNT(t) AS data,ID(n) AS id
    `
    return this.cypherPromise(cypher).then((res)=>{
        return sortResult(res,ids);
    }).then((res)=>{
        return res.map((r)=>r.data);
    })
}

module.exports = db
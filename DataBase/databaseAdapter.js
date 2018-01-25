var dbConfig = require('./databaseConfig')
var db = require('seraph')({server: dbConfig.url+":"+dbConfig.port})
const _ = require('lodash')
// Helper functions
// -----------------------------
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

function labelResult(res,label){
    res.forEach((r)=>{
        r.forEach((obj)=>{
            obj.__label = label;
        })
    });
    return res;
}

function sortResult(res,ids){
    res.sort((a,b)=>{
        return ids.indexOf(a.id) - ids.indexOf(b.id);
    })
    return res;

}

function extractData(res){
    return res.map((r)=>r.data);
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
//   source(Object): starting node. should have id and __label
//   rels([Object]): array of rel objects. each rel object should have both label and direction fields
//     example: {label: "SONG_OF",direction: "OUT"}
//   targetType(String): type of node to return
// Returns:
//   a promise that resolves by database result
db.getRels = function(source,rels,targetType){
    // making sure rels is an array
    rels = Array.isArray(rels) ? rels : [rels];
    let cypherRels = makeCypherRels(rels);
    let cypher = `
        MATCH (n:${source.__label})${cypherRels}(t:${targetType})
        WHERE ID(n) = ${source.id}
        RETURN t
    `
    return this.cypherPromise(cypher);
}

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
        return extractData(res)
    }).then((res)=>{
        return labelResult(res,targetType)
    });
}

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
        return extractData(res);
    })
}

db.countRels = function(source,rels,targetType){
    // making sure rels is an array
    rels = Array.isArray(rels) ? rels : [rels];
    let cypherRels = makeCypherRels(rels);
    let cypher = `
        MATCH (n:${source.__label})${cypherRels}(t:${targetType})
        WHERE ID(n) = ${source.id}
        RETURN count(t) AS count
    `
    return this.cypherPromise(cypher)
}

module.exports = db
var dbConfig = require('./databaseConfig')
var db = require('seraph')({server: dbConfig.url+":"+dbConfig.port})

// Helper functions
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
    console.log(cypher);
    return new Promise((resolve,reject)=>{
        this.query(cypher,(err,nodes)=>{
            if(err) reject(err);
            nodes.forEach((node)=>{
                node.__label = targetType;
            })
            resolve(nodes);
        });
    })
}

module.exports = db
var dbConfig = require('./databaseConfig')
var db = require('seraph')({server: dbConfig.url+":"+dbConfig.port})


db.dbIdToNodeId = function(label, id){
    return label + ":" + id;
}
db.nodeIdToDbId = function(id){
    return id.split(":");
}
db.getRels = function(source,rel,dir,targetType){
    let cypher = `
        MATCH (n:${source.__label})
    `
    if(dir === "IN"){
        cypher += `<-[:${rel}]-`
    } else if(dir === "OUT") {
        cypher += `-[:${rel}]->`
    }
    cypher += `
        (t:${targetType})
        WHERE ID(n) = ${source.id}
        RETURN t
    `
    return new Promise((resolve,reject)=>{
        this.query(cypher,(err,nodes)=>{
            if(err) reject(err);
            nodes.forEach((node)=>{
                node.__label = targetType;
            })
            resolve(nodes);
        });
    })
};


module.exports = db
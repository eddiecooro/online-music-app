var dbConfig = require('./DatabaseConfig')
import {v1 as neo4j} from 'neo4j-driver';

let driver = neo4j.driver(dbConfig.url + ":" + dbConfig.port);
// driver.onCompleted(()=>{
//     console.log("database Connected")
// })
// driver.onError(()=>{
//     console.log("Error when connecting to database");
// })

module.exports = driver
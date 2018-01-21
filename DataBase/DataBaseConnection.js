var dbConfig = require('./DatabaseConfig')
var db = require('seraph')({server: dbConfig.url+dbConfig.port})



module.exports = db
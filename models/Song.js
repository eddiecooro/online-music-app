var db = require('../DataBase/DataBaseConnection')
var SongModel = require('seraph-model')(db,'Song')

SongModel.schema ={
    name: {type:String,required:true},
    description: {type:String},
    genre: {type:Array},
    lyrics: {type:Array},
    releaseDate: {type:Date},
    url: {type:String,require:true},
    cover: {type:String},
    tags:{type:Array}
}
SongModel.useTimestamps("CreatedAt","UpdatedAdd")

module.exports= SongModel
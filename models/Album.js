var db = require('../DataBase/DataBaseConnection')
var AlbumModel = require('seraph-model')(db,'Album')
AlbumModel.schema = {
    name: {type:String,required:true},
    cover: {type:String},
    releaseDate: {type:Date},
}
AlbumModel.useTimestamps('CreatedAt','UpdatedAt')

module.exports = AlbumModel
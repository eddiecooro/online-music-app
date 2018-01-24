var db = require('../database/databaseAdapter')
var AlbumModel = require('seraph-model')(db,'Album')
AlbumModel.schema = {
    name: {type:String,required:true},
    cover: {type:String},
    releaseDate: {type:Date},
}
AlbumModel.useTimestamps('CreatedAt','UpdatedAt')

export default AlbumModel
var db = require('../DataBase/DataBaseConnection')
var ArtistModel = require('seraph-model')(db,'Artist')

ArtistModel.schema = {
    name: {type:String,required : true},
    avatar: {type:String},
    age: {type:Number, min : 1,max: 200},
    description: {type:String},
}
ArtistModel.useTimestamps('CreatedAt','UpdatedAt')

export default ArtistModel;
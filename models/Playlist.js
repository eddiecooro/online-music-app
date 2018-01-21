var db = require('../DataBase/DataBaseConnection')
var PlayListModel = require('seraph-model')(db, 'PlayList')

PlayListModel.schema = {
    name: { type: String, required: true },
    cover: { type: String },
    private: { type: Boolean, default: true },
    expireDate: { type: Date }
}
PlayListModel.useTimestamps('CreatedAt','UpdatedAt')

module.exports = PlayListModel

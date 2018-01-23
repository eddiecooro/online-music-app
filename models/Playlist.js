var db = require('../database/databaseAdapter')
var PlaylistModel = require('seraph-model')(db, 'Playlist')

PlaylistModel.schema = {
    name: { type: String, required: true },
    cover: { type: String },
    private: { type: Boolean, default: true },
    expireDate: { type: Date }
}
PlaylistModel.useTimestamps('CreatedAt','UpdatedAt')

export default PlaylistModel

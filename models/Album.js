const mongoose = require('mongoose');

var AlbumsSchema = new mongoose.Schema({
    name: String,
    cover: String,
    releaseData: Date,
}, {
    timestamps: true;
});

module.exports = mongoose.model('Album', AlbumsSchema);
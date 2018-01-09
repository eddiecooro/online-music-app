const mongoose = require('mongoose');

var AlbumSchema = new mongoose.Schema({
    name: String,
    cover: String,
    releaseData: Date,
}, {
    timestamps: true,
});

export const Album = mongoose.model('Album', AlbumSchema);
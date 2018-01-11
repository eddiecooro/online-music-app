const mongoose = require('mongoose');

var AlbumSchema = new mongoose.Schema({
    name: String,
    cover: String,
    releaseDate: Date,
}, {
    timestamps: true,
});

AlbumSchema.index({name:'text'});

export const Album = mongoose.model('Album', AlbumSchema);
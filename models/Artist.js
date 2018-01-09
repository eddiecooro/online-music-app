const mongoose = require('mongoose');

var ArtistSchema = new mongoose.Schema({
    name: String,
    description: String,
    rels: [{ rel:String, rel_id:Number }],
    songs: [{
        rel: String, // For example: Singer | Writter | Composer ...        
        song: Number //SongId
    }]
}, {
    timestamps: true
});

export const Artist = mongoose.model('Artist', ArtistSchema);
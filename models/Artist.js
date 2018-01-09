const mongoose = require('mongoose');

var ArtistSchema = new mongoose.Schema({
    name: String,
    description: String,
    rels: [{ rel:String, rel_id:String }],
    songs: [{
        rel: String, // For example: Singer | Writter | Composer ...        
        song: String //SongId
    }]
}, {
    timestamps: true
});

export const Artist = mongoose.model('Artist', ArtistSchema);
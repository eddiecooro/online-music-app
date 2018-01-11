const mongoose = require('mongoose');

var ArtistSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    age:Number,
    SingerType:String,
    description: String,
    rels: [{ rel:String, rel_id:Number }],
    albums: [{
        rel: String,
        album: String
    }],
    songs: [{
        rel: String, // For example: Singer | Writter | Composer ...        
        song: String //SongId
    }]
}, {
    timestamps: true
});

ArtistSchema.index({name:'text'});

export const Artist = mongoose.model('Artist', ArtistSchema);
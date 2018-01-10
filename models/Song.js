import mongoose from 'mongoose';

var SongSchema = new mongoose.Schema({
    name: String,
    description: String,
    genre: [String],
    lyrics: [String],
    releaseDate: Date,
    url: String,
    cover: String,
    rels: [{ rel:String, rel_id:Number }],
    albumId: { type: String },
    tags:[String]
},{
    timestamps: true
});

export const Song = mongoose.model("Song",SongSchema);
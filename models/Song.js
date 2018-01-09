import mongoose from 'mongoose';

var SongSchema = new mongoose.Schema({
    name: String,
    desc: String,
    genre: [String],
    label: [String],
    lyrics: [String],
    releaseData: Date,
    url: String,
    cover: String,
    rels: [{ rel:String, rel_id:Number }],
    album: { type: Number, default: -1 },
    tag:[String]
},{
    timestamps: true
});

export const Song = mongoose.model("Song",SongSchema);
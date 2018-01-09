var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var PlaylistSchema = new Schema({
    name:{type:String,require:true},
    tracks:[Number],
    cover:String,
    private: {type:Boolean, default:true},
    expireDate:Date
}, {
    timestamps: true,
});

PlaylistSchema.virtual('trackCount').get(
    function(){ return this.tracks.length }
);

export const Playlist = mongoose.model("Playlist",PlaylistSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PlaylistSchema = new Schema({
    name:{type:String,require:true},
    tracks:[String], // song ids
    cover:String,
    private: {type:Boolean, default:true},
    expireDate:Date
}, {
    timestamps: true,
});

PlaylistSchema.index({name:'text'});

PlaylistSchema.virtual('trackCount').get(
    function(){ return this.tracks.length }
);

export const Playlist = mongoose.model("Playlist",PlaylistSchema);

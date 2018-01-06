var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var PlaylistSchema = new Schema({
    name:{type:String,require:true},
    tracks:[Number],
    cover:String,
    expireDate:Date
});

PlaylistSchema.virtual('trackCount').get(
    function(){ return this.tracks.length }
);

module.exports = mongoose.model("Playlist",PlaylistSchema);

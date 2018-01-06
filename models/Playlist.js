var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var PlaylistSchema = new Schema(
    {
        name:{type:String,require:true},
        tracks:[Number],
        trackCount:{type:Number,min:1},
        cover:String,
        expireDate:Date

    }
);

module.exports = mongoose.model("Playlist",PlaylistSchema);

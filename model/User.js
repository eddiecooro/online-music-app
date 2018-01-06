var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: Number,
    username: {type: String,unique:true},
    password:String,
    email:{type:String,unique:true},
    avatar:String,
    nickname:String,
    gender:String,
    age:{type:Number,min:1,max:200},
    followedArtist:[Number],
    songsRel:[{songId:Number,rel:String}],
    loginTime:[Number]




})
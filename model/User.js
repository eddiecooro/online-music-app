var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    isValid: {type:Boolean,default:false},
    username: {type: String,unique:true},
    password:String,
    email:{type:String,unique:true},
    avatar:String,
    nickname:String,
    gender:String,
    age:{type:Number,min:1,max:200},
    playlist:[{
        name:String,
        cover:String,
        trackCount:{type:Number,min:1},
        shuffle:{type:Boolean,default:false},
        tracks:[Number],

    }],
    followedArtist:[Number],
    songsRel:[{songId:Number,rel:String}],
    loginTime:[Number]




})
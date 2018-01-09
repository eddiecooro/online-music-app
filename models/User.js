var mongoose = require("mongoose");
const mb = require('mongoose-bcrypt');
var Schema = mongoose.Schema;

function validateEmail(email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
 }

var UserSchema = new Schema({
    emailValidated: {type:Boolean,default:false},
    validateUrl: {type:String},    
    username: {type: String,required:true,unique:true},
    password: {type: String,required:true, bcrypt: true},
    raw_password: {type: String}, //dev only
    email:{
        type:String,
        unique: true,
        required: true,
        lowercase: true,
        validate: validateEmail,
    },
    avatar:String,
    nickname:String,
    gender:String,
    age:{type:Number,min:1,max:200},
    playlists:[String], //playlist Id's
    followedArtists:[String],
    songsRels:[{songId:String,rel:String}],
    loginTime:Number
}, {
    runSettersOnQuery: true,
    timestamps: true,
});

UserSchema.pre('save', function(next){
    if(this.followedArtist){
        this.followedArtist = this.followedArtist.filter(function(item, pos) {
            return this.followedArtist.indexOf(item) == pos;
        });
    }
    next();
});

UserSchema.plugin(mb, {rounds: 10});

export const User = mongoose.model("User", UserSchema);
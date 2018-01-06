var mongoose = require("mongoose");
const mb = require('mongoose-bcrypt');
var Schema = mongoose.Schema;

function validateEmail(email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
 }

var UserSchema = new Schema({
    emailValidated: {type:Boolean,default:false},
    username: {type: String,required:true,unique:true},
    password: {type: String,required:true, bcrypt: true},
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
    playlist:[Number], //playlist Id's
    followedArtist:[Number],
    songsRel:[{songId:Number,rel:String}],
    loginTime:Number
});

UserSchema.pre('save', function(next){
    this.followedArtist = this.followedArtist.filter(function(item, pos) {
        return this.followedArtist.indexOf(item) == pos;
    });
    next();
});

UserSchema.plugin(mb, {rounds: 10});

module.exports = mongoose.model("User", UserSchema);
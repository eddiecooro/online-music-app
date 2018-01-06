var mongoose = require("mongoose");
const mb = require('mongoose-bcrypt');
var Schema = mongoose.Schema;

function validateEmail(email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email.text);
 }

var UserSchema = new Schema({
    emailValidated: {type:Boolean,default:false},
    username: {type: String,required:true,unique:true},
    password: {type: String,required:true, bcrypt: true},
    email:{
        type:String,
        unique: true,
        required: true,
        validate: validateEmail,
    },
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
});

UserSchema.pre('save', function(next){
    this.followedArtist = this.followedArtist.filter(function(item, pos) {
        return this.followedArtist.indexOf(item) == pos;
    })
});

UserSchema.plugin(require('mongooseBcrypt'), {rounds: 10});

module.exports = mongoose.model("User", UserSchema);
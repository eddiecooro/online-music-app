var db = require('../database/databaseAdapter')
var UserModel = require('seraph-model')(db, 'User')
const bcrypt = require("bcrypt");



var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

db.query("CREATE CONSTRAINT ON (user:User) ASSERT user.username IS UNIQUE",(err,data)=>{
    if(err){
        console.log(err);
    }
})
db.query(" CREATE CONSTRAINT ON (user:User) ASSERT user.email IS UNIQUE",(err,data)=>{
    if(err){
        console.log(err);
    }
})

UserModel.on('beforeSave', (obj) => {
    obj.password = bcrypt.hashSync(obj.password, 12)
    return obj
})
UserModel.verifyPassword = function(user,password){
    return bcrypt.compare(password,user.password)
}

UserModel.schema = {
    //Comment Just For Dev
    //It Works
    emailValidated: { type: Boolean, default: false },
    validateUrl: { type: String },
    username: {
        type: String, required: true,
    },
    password: {
        type: String,
        required: true,
    },
    raw_password: { type: String }, //dev only

    email: {
        type: String,
        required: true,
        lowercase: true,
        match: emailRegex,
    },
    admin: {type:Boolean},
    avatar: { type: String },
    nickname: { type: String },
    gender: { type: String },
    age: { type: Number, min: 1, max: 200 },
    loginTime: { type: Number }
}
UserModel.useTimestamps('CreatedAt','UpdatedAt')

export default UserModel
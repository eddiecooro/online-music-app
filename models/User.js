var db = require('../DataBase/DataBaseConnection')
var UserModel = require('seraph-model')(db, 'User')
const bcrypt = require("bcrypt");



var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

UserModel.setUniqueKey('username')
UserModel.setUniqueKey('email')
UserModel.on('beforeSave', (obj) => {
    console.log('encrypting Password')
    obj.password = bcrypt.hashSync(obj.password, 8)
    return obj
})

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
    avatar: { type: String },
    nickname: { type: String },
    gender: { type: String },
    age: { type: Number, min: 1, max: 200 },
    loginTime: { type: Number }
}
UserModel.useTimestamps('CreatedAt','UpdatedAt')

export default UserModel
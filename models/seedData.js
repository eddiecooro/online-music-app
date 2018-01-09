import {User} from './User';
const Chance = require('chance');
const chance = new Chance();

module.exports = ()=>{
    console.log("Filing User Collection");
    let saves = [];
    for(let i = 0;i < 100;i++){
        let password = chance.word();
        let newUser = new User({
            emailValidated: chance.bool(),
            username: chance.first(),
            password: password,
            raw_password: password,
            email: chance.email(),
            avatar: chance.avatar({protocol:'https',fileExtension:'jpg'}),
            nickname: chance.first(),
            gender: chance.gender(),
            age: chance.age(),
        });
        saves.push(newUser.save().then(()=>{
            console.log("User saved")
        }).catch(()=>{
            console.log("User save failed")
        }));
    };
    return saves;
};

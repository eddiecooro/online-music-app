require('babel-register');
require('babel-polyfill');
const seedData = require('./seedData');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/onlineMusicApp').then(()=>{
    console.log("connected to database");
    Promise.all(seedData.createBase()).then(()=>{
        seedData.makeRelations().then((message)=>{
            console.log(message);
            console.log("connection close");
            mongoose.connection.close();
        });
    });
});

require('babel-register');
const seedData = require('./seedData');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/onlineMusicApp').then(()=>{
    console.log("connected to database");
    Promise.all(seedData.createBase()).then(()=>{
        console.log("connection close");
        mongoose.connection.close();
    });
});

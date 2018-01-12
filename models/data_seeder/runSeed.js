require('babel-register');
require('babel-polyfill');
const seedData = require('./seedData');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/onlineMusicApp').then(()=>{
    console.log("connected to database");
    Promise.all(seedData.createBase()).then(()=>{
        seedData.makeRelation().then((message)=>{
            console.log(message);
            console.log("connection close");
            mongoose.connection.close();
        });
    });
});
process.on('SIGINT', function() {  
    mongoose.connection.close(function () { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  }); 

require('babel-register');
require('babel-polyfill');
const seedData = require('./seedData');

Promise.all(seedData.createBase())
  .then(seedData.MakeRels())


// process.on('SIGINT', function() {  
//     mongoose.connection.close(function () { 
//       console.log('Mongoose default connection disconnected through app termination'); 
//       process.exit(0); 
//     }); 
//   }); 

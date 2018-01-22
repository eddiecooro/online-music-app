require('babel-register');
require('babel-polyfill');
const seedData = require('./seedData');

var data = seedData.createBase()
setTimeout(()=>{
seedData.MakeRels(data)
},10000)


// process.on('SIGINT', function() {  
//     mongoose.connection.close(function () { 
//       console.log('Mongoose default connection disconnected through app termination'); 
//       process.exit(0); 
//     }); 
//   }); 

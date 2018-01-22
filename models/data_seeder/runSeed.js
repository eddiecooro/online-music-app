require('babel-register');
require('babel-polyfill');
const seedData = require('./seedData');

var base =  seedData.createBase()
var saves = base.saves
var ids = base.ids
Promise.all(
  base
   )
  .then(console.log(ids))


// process.on('SIGINT', function() {  
//     mongoose.connection.close(function () { 
//       console.log('Mongoose default connection disconnected through app termination'); 
//       process.exit(0); 
//     }); 
//   }); 

const express = require('express');
const mongoose = require('mongoose');
const passport = require
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const graphql = require('graphql');
const graphqlHttp = require('express-graphql');
const auth = require('./auth')();
const jwt = require('jwt-simple');
// adding helmet secury middleware
const helmet = require('helmet');

import graphqlSchema from './graphql';
import { User,Album } from './models';
import { jwtOptions } from './config';

mongoose.connect('mongodb://localhost/onlineMusicApp').then(() =>{
    console.log("Connected Seccessfuly");}).catch((err) =>{
    console.log(err);
});
mongoose.Promise = global.Promise;


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(helmet());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(auth.initialize());

app.use('/secret',(req,res)=>{
  res.send('Secret Path');
})
app.use('/login',(req,res)=>{
  if(req.body.username && req.body.password){
    let username = req.body.username;
    let password = req.body.password;
    Album.create({
      name:"Hogtw",
    }).then((album)=>{
      console.log(album);
    })
  } else {
  res.send("no username | password")    
  }
})
app.use('/graphql', graphqlHttp({ schema: graphqlSchema, graphiql:true,pretty:true }) );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

module.exports = app;

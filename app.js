const express = require('express');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const graphql = require('graphql');
const graphqlHttp = require('express-graphql');
// adding helmet secury middleware
const helmet = require('helmet');
let driver = require("./DataBase/DataBaseConnection");  

import graphqlSchema from './graphql';
import { login, graphqlAuthenticate } from './auth';
// import { User } from './models';
import { jwtOptions } from './config';


var app = express();

// // setting authenticate strategy
// const params = {
//   secretOrKey: jwtOptions.jwtSecret,
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
// };
// let strategy = new Strategy(params, async (payload,done)=>{
//   User.findById(payload.id).then((user)=>{
//       if(user){
//           return done(null, user); 
//       } else {
//           return done(new Error("User not found"),null);
//       }
//   });
// });
// passport.use(strategy);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(helmet());
// Uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/login',login)
// const db = require('./models/databaseAdapter')
app.use('/graphql',  (req,res,next)=>{
    let context = {
      driver: driver
    };
    // if(req.user) context.user = req.user;
    return graphqlHttp({ 
      schema: graphqlSchema,
      context:context,
      graphiql:true,
      pretty:true
     })(req,res,next)
  }
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on('SIGINT', function () {
  driver.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = app;

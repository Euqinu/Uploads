var passport=require('passport');
var localStrategy=require('passport-local').Strategy;
var User=require('../models/db');


passport.use(new localStrategy(
  function(username,password,done){
    const UserDetails=User.findOne(username)

    if(UserDetails==null){
        return done(null,false);
    }
    if(UserDetails.password!==password){
     // console.log(UserDetails)
        return done(null,false)
    }
    return done(null,UserDetails)
    
    }));

   
    passport.serializeUser(function(user,done){
        console.log('Serialized');
        done(null,user.id);
      });

     passport.deserializeUser(function(id,done){
       console.log('Deserialized');
       User.findById(id).then(function(user){
         done(null,user);
       })
      });
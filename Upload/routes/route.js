const express=require('express');
const passport=require('passport');
const passportConfig=require('../config/passport-config');

const route=express.Router();

route.post('/',
	passport.authenticate('local'),(req,res)=>{
        console.log('Login route successful');        
        res.redirect('/home');
});

module.exports=route;
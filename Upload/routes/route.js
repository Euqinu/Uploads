const express=require('express');
const passport=require('passport');
const passportConfig=require('../config/passport-config');

const route=express.Router();

route.post('/login',
	passport.authenticate('local'),(req,res)=>{
        console.log(req.user);
        console.log(req.session);
        res.redirect('/home');
});

module.exports=route;
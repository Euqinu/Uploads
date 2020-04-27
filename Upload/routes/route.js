const express=require('express');
const passport=require('passport');
const passportConfig=require('../config/passport-config');

const route=express.Router();

const authRoute=(req,res,next)=>{
    console.log(req.user);
    if(!req.user){
        res.redirect('/')
    }
    else{
        next();
    }
}

route.get('/',(req,res)=>{
    res.render('login')
})

route.get('/browse',(req,res)=>{
    res.render('browse')
})

route.get('/home',(req,res)=>{
    //console.log(req.user);
    res.render('home');
})

route.get('/upload', function(req, res){
    res.render('upload');
});

route.post('/login',
	passport.authenticate('local'),(req,res)=>{
    
        console.log(req.user);
        console.log(req.session);
       res.redirect('/home')
    });

//route.post('/login',passport.authenticate('local',{successRedirect:'/home',failureRedirect:'/login'}))

// route.get('/browse',authRoute,(req,res)=>{
//     res.render('browse')
// })

route.get('/multiethnic',(req,res)=>{
    res.render('multiethnic');
})

route.get('/fresher',(req,res)=>{
    res.render('freshers');
})



module.exports=route;
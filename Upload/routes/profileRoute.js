const express=require('express')

const route=express.Router();

const authRoute=(req,res,next)=>{
    if(!req.user)
    {
        res.redirect('/')
    }
    else
    {
        next();
    }
}

route.get('/',(req,res)=>{
    res.render('login')
});

route.get('/home',authRoute,(req,res)=>{
    res.render('home');
});

route.get('/browse',authRoute,(req,res)=>{
    res.render('browse')
});

route.get('/upload',authRoute, function(req, res){
    res.render('upload');
});

route.get('/multiethnic',authRoute,(req,res)=>{
    res.render('multiethnic');
});

route.get('/fresher',(req,res)=>{
    res.render('freshers');
});

route.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

module.exports=route
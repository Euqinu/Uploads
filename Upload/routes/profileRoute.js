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
    res.render('loginMobile')
});

route.get('/test',(req,res)=>{
    res.render('test')
});

route.get('/home',authRoute,(req,res)=>{
    res.render('homeMobile');
});

route.get('/browse',authRoute,(req,res)=>{
    res.render('browseMobile')
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
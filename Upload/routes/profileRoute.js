const express=require('express')

const route=express.Router();

const authRoute=(req,res,next)=>{
    if(!req.user){
        res.redirect('/')
    }
    else{
        next();
    }
}

route.get('/',(req,res)=>{
  //  res.render('home');
    res.send('hello'+req.user)
})

route.get('/browse',authRoute,(req,res)=>{
    res.render('browse')
})

module.exports=route
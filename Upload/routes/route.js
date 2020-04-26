const express=require('express');
const passport=require('passport');
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

// route.get('/home',(req,res)=>{
//     res.render('home');
// })

route.get('/upload', function(req, res){
    res.render('upload');
});

route.post('/login',
	passport.authenticate('local'),(req,res)=>{
        console.log(req.user);
       res.redirect('/user/')
    });

// route.get('/browse',authRoute,(req,res)=>{
//     res.render('browse')
// })

route.get('/multiethnic',authRoute,(req,res)=>{
    res.render('multiethnic');
})

route.get('/fresher',authRoute,(req,res)=>{
    res.render('freshers');
})



module.exports=route;
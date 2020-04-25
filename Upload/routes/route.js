const express=require('express');

const route=express.Router();

route.get('/upload', function(req, res){
    res.render('upload');
});


route.get('/',(req,res)=>{
    console.log('testing');
    res.render('home')
})

route.get('/browse',(req,res)=>{
    res.render('browse')
})

route.get('/multiethnic',(req,res)=>{
    res.render('multiethnic');
})
route.get('/fresher',(req,res)=>{
    res.render('freshers');
})
// route.get('/freshers',(req,res)=>{
//     res.render('home');
// })


module.exports=route;
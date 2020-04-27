const express = require('express');  //app router
const multer = require('multer'); 
const {Storage}=require('@google-cloud/storage');
const path=require('path');

const route=express.Router();


//Creating a client
const gc= new Storage({
    keyFilename:path.join(__dirname,"../keyFile.json"),
    projectId:'whatstrending-0013'
});

const nitrBucket=gc.bucket('nitr_2015_2019');


const multerConfig = {
    
    storage: multer.diskStorage({
     //Setup where the user's file will go
     destination: function(req, file, next){
       next(null, './public/photo-storage');
       },   
        
        //Then give the file a unique name
        filename: function(req, file, next){
            console.log(file);
            const ext = file.mimetype.split('/')[1];
            next(null, file.fieldname + '-' + Date.now() + '.'+ext);
          }
        }),   
        
        //A means of ensuring only images are uploaded. 
        fileFilter: function(req, file, next){
              if(!file){
                next();
              }
            const image = file.mimetype.startsWith('image/');
            if(image){
              console.log('photo uploaded');
              next(null, true);
            }else{
              console.log("file not supported");
              return next();
            }
        }
 };

      const multerTest = multer({
        storage: multer.memoryStorage(),
        limits: {
          fileSize: 5 * 1024 * 1024, 
        },
      });

       route.post('/',multerTest.array('file',12),async function(req,res){
        let promises = [];
         if (!req.files) {
             res.status(400).send('No file uploaded.');
             return;
           }

         req.files.forEach((file) => {
            const blob = nitrBucket.file(file.originalname)
            const newPromise =  new Promise((resolve, reject) => {
              blob.createWriteStream({
                metadata: { contentType: file.mimetype }
              }).on('finish', async response => {
                await blob.makePublic()
                resolve(response)
              }).on('error', err => {
                reject('upload error: ', err)
              }).end(file.buffer)
            })
           promises.push(newPromise)
         })
     
     
     Promise.all(promises).then((response) => {
        res.status(200).send("Uploaded")
      }).catch((err) => {
        res.status(400).send(err.message)
      });

    });
     

         module.exports=route;
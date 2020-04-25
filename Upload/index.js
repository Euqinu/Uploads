const express = require('express');  //app router
const multer = require('multer'); // file storing middleware
const bodyParser = require('body-parser'); //cleans our req.body
const {Storage}=require('@google-cloud/storage');
const path=require('path');
// SETUP APP
const app = express();   //This IS an express app
const route=require('./routes/route');
const port = process.env.PORT || 3000;  //preconfig your port!

app.use(bodyParser.urlencoded({extended:false})); //handle body requests
app.use(bodyParser.json()); // let's make JSON work too!
app.use(express.static('public'));
app.set('view engine','ejs');
app.use('/',route);

const gc= new Storage({
    keyFilename:path.join(__dirname,"./keyFile.json"),
    projectId:'whatstrending-0013'
});

const nitrBucket=gc.bucket('nitr_2015_2019');
//gc.getBuckets().then(x=>console.log(x));


//MULTER CONFIG: to get file photos to temp server storage
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
              
              //TODO:  A better message response to user on failure.
              return next();
            }
        }
      };


      app.get('/', function(req, res){
        res.render('home.html');
    });

    const multerTest = multer({
        storage: multer.memoryStorage(),
        limits: {
          fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
        },
      });
      

   // var upload=multer({dest:'./public/photo-storage'});
      app.post('/upload',multerTest.single('file'),function(req,res,next){
       // res.send('Complete!');
       console.log('post request started');
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
          }

        const blob=nitrBucket.file(req.file.originalname);
        console.log('blob');
        const blobStream = blob.createWriteStream();
        console.log('blobStream');

        blobStream.on('error', (err) => {
            next(err);
          });
        
          blobStream.on('finish', () => {
              console.log('reached finish');
            // The public URL can be used to directly access the file via HTTP.
            // const publicUrl = format(
            //   `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            // );
            // res.status(200).send(publicUrl);
            res.send('finished');
          });
        
          blobStream.end(req.file.buffer);
        });
    

     

     app.listen(port,function(){
        console.log(`Server listening on port ${port}`);
    });
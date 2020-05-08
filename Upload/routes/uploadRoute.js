const express = require('express');  
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const route = express.Router();


//Creating a client
// const gc = new Storage({
//   keyFilename: path.join(__dirname, "../keyFile.json"),
//   projectId: 'whatstrending-0013'
// });

const gc= new Storage();

const nitrBucket = gc.bucket(process.env.GCLOUD_STORAGE_BUCKET);



const multerTest = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

route.post('/', multerTest.array('file', 12), async function (req, res) {
  let promises = [];
  if (!req.files) {
    res.status(400).send('No file uploaded.');
    return;
  }

  req.files.forEach((file) => {
    const blob = nitrBucket.file(file.originalname)
    const newPromise = new Promise((resolve, reject) => {

      blob.createWriteStream({
        metadata: { contentType: file.mimetype }
      }).on('finish', async response => {
        await blob.makePublic()
        console.log(response)
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


module.exports = route;
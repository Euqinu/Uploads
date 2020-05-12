const express = require('express');  
const bodyParser = require('body-parser'); 
const cookieSession=require('cookie-session');
const passport=require('passport');
const passportConfig=require('./config/passport-config');
const keys=require('./config/keys');
const profileRoute=require('./routes/profileRoute');
const uploadRoute=require('./routes/uploadRoute');
const path=require('path');
const app = express();   
const route=require('./routes/route');

const port = process.env.PORT || 3000; 


app.use(express.static(path.join(__dirname, 'static')));


app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 

app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:[keys.keys]
 
 }));

//  app.use(session({
//   secret: 'work hard',
//   resave: true,
//   saveUninitialized: false,
  
// }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',profileRoute);
app.use('/login',route);
app.use('/upload-files',uploadRoute);

app.listen(port,function(){
  console.log(`Server listening on port ${port}`);
 });
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');

//acessing database
const db  = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');



app.use(express.urlencoded());
app.use(cookieParser());
//app look out for static(assets)
//app accessing assets folder and its files
app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//setting up the view engine which is ejs
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
   name:'social',
   //TODO change the secret before deployment in production mode
   secret:'blahsomething',
   saveUninitialized:false,
   resave:false,
   cookie:{
    //age of the cookie-session
    maxAge:(1000*60*100)//in miliseconds
   }
}));

app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use('/',require('./routes'));

//port listen
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`server is running on port ${port}`);
})
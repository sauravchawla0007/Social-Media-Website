
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
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');

//using cors
const cors = require("cors");
const sassMiddleware = require('node-sass-middleware');
//for flash notifications 
const flash = require('connect-flash');
const customMware = require('./config/middleware');//fetching

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

//using cors
app.use(cors());

app.use(express.urlencoded());
app.use(cookieParser());
//app look out for static(assets)
//app accessing assets folder and its files
app.use(express.static('./assets'));

// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//setting up the view engine which is ejs
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db 
app.use(session({
   name:'social',
   //TODO change the secret before deployment in production mode
   secret:'blahsomething',
   saveUninitialized:false,
   resave:false,
   cookie:{
    //age of the cookie-session
    maxAge:(1000*60*100)//in miliseconds
   },
   store: new MongoStore(
    {
        mongooseConnection: db,
        autoRemove: 'disabled',
        mongoUrl:"mongodb://127.0.0.1:27017/social_development"
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
)
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes/index'));

//port listen
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`server is running on port ${port}`);
})
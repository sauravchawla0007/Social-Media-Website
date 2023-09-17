const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');

//acessing database
const db  = require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());
//app look out for static(assets)
//app accessing assets folder and its files
app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes'));

//setting up the view engine which is ejs
app.set('view engine','ejs');
app.set('views','./views');

//porst listen
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`server is running on port ${port}`);
})
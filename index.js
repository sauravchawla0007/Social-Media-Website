const express = require('express');
const app = express();
const port = 8000;
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
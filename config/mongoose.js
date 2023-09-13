// require the library
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/social_development');

// aquire the connection (to check if it is successful)
const db = mongoose.connection;
// error
db.on('error', console.error.bind(console, "Error Connecting To Mongodb"));
// up and running then print the message
db.once('open', function () {
    console.log('Connected To Database :: Mongodb');
});
// exporting the database
module.exports = db;




//latest method for connecting to databases 
// const mongoose = require('mongoose');

// //acquire the connection(to check if it's successful)
// main()
// .then(()=>console.log("connected to database::mongoDB successfully"))
// .catch(err => console.log(err));

// //connect to the database
// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/social_development');
   
//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }


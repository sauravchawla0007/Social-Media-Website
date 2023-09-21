// const passport = require('passport');

// const LocalStrategy = require('passport-local').Strategy;

// //fetching User from models
// const User = require('../models/user');


// // authentication using passport
// passport.use(new LocalStrategy({
//         usernameField: 'email'
//     },
//     function(email, password, done){
//         // find a user and establish the identity (will fetch User models/user.js)

//         //1.find the user and authenticating them  
//         User.findOne({email: email}, function(err, user)  {
//             if (err){
//                 console.log('Error in finding user --> Passport');
//                 return done(err);
//             }

//             if (!user || user.password != password){
//                 console.log('Invalid Username/Password');
//                 return done(null, false);
//             }
           
//             //if user found pass the user  
//             return done(null, user);
//         });
//     }


// ));


// // serializing the user to decide which key is to be kept in the cookies
// //2.once the user is found we serialize the user which is we find out which property send to the cookies and cookies send to the browser automatically in the response  
// passport.serializeUser(function(user, done){
//     done(null, user.id);
// });



// // deserializing the user from the key in the cookies
// //3.and next request comes in we need to deserialize it wwe need to find which user is signed in and making a request 
// passport.deserializeUser(function(id, done){
//     //find in data base 
//     User.findById(id, function(err, user){
//         if(err){
//             console.log('Error in finding user --> Passport');
//             return done(err);
//         }
 
//         return done(null, user);
//     });
// });



// module.exports = passport;


const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    async function(req, email, password, done){
        // find a user and establish the identity
        try{

            let user = await User.findOne({email: email});
    
                if (!user || user.password != password){
                    req.flash('error', 'Invalid Username/Password');
                    return done(null, false);
                }
    
                return done(null, user);
        }catch(err){
            console.log("error in signin",err);
        }
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done){
    try{
        let user = await User.findById(id);

        return done(null, user);
    }catch(err){
        console.log("error in deserialize",err);
    }
});
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:"564408005604-treif2qjlhsgpv4d3i5sc1ir88a704uk.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    async function(accessToken, refreshToken, profile, done){
        try{
            let user = await User.findOne({email: profile.emails[0].value});
    
            if(user){
                return done(null, user);
            }else{
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
                return done(null, user);
            }
        }catch(error){
            console.log("Error in passport google strategy file",error);
        }
        
    }));
    
    module.exports = passport;
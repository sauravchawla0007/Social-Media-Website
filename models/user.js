const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true   
    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true//Timestamps save the current time of the document created and also when it was updated in form of a Date by turning it true
})

const User = mongoose.model('User',userSchema);
module.exports = User;
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
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
    },
    avatar: {
        type: String
    }
},{
    timestamps:true//Timestamps save the current time of the document created and also when it was updated in form of a Date by turning it true
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));//this it the path of uploads/users/avatars
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

  //static function/methods
  userSchema.statics.uploadedAvatar = multer({storage:  storage}).single('avatar');
  userSchema.statics.avatarPath = AVATAR_PATH;



const User = mongoose.model('User',userSchema);
module.exports = User;
const User = require('../models/user');

module.exports.profile = async function(req, res){
  console.log(req.cookies,"inside profile");
  try{ 
    
       let user = await User.findById(req.params.id);
      // console.log(user,"user found");
          return res.render('user_profile', {
              title: 'User Profile',
              user: req.user,
              profile_user : user
          });
        
  }catch(err){
      console.log("error in profile controller",err);
  }

}


module.exports.update = async function(req, res){
   

  if(req.user.id == req.params.id){

      try{
        let user = await User.findById(req.params.id);
        User.uploadedAvatar(req, res, function(err){
            if (err) {console.log('*****Multer Error: ', err)}
            
            user.name = req.body.name;
            user.email = req.body.email;

            if (req.file){

                if (user.avatar){
                    fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                }


                // this is saving the path of the uploaded file into the avatar field in the user
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            user.save();
            return res.redirect('back');
        });
       

      }catch(err){
          req.flash('error', err);
          return res.redirect('back');
      }


  }else{
      req.flash('error', 'Unauthorized!');
      return res.status(401).send('Unauthorized');
  }
}


// module.exports.profile = function(req,res){
//     return res.render('user_profile',{
//         title:"User Profile",
//       })
// }


//render the sign up page
module.exports.signUp = function(req,res){
   if(req.isAuthenticated()){
    return res.redirect('/users/profile');
   }

    return res.render('user_sign_up',{
        title:"Social | Sign Up",
    })
}

//render the sign in page
module.exports.signIn = function(req,res){

  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  } 

  return res.render('user_sign_in',{
      title:"Social | Sign In",
  })
}

//get the sign up data

module.exports.create = async (req, res) => {
    try {

       if (req.body.password != req.body.confirm_password) {
           req.flash('error', 'Passwords do not match');
           return res.redirect("back");
       }
  
       var user = await User.findOne({ email: req.body.email });
              if (!user) {
              await User.create(req.body);
              } else {
              
                  console.log('User is already present !!')
              }
              req.flash('error', 'Passwords do not match');('success', 'You have Signed-Up Successfully !')
              return res.redirect("/users/sign-in");
  
    } catch (error) {
      console.log("Error", error);
    }
  };


//sign in and create a session for the user
// module.exports.createSession = async function (req, res) {
//   //steps to authenticate   
//   try {
//       const user = await User.findOne({ email: req.body.email }).exec();
  
//       if (!user) {
//         // Handle user not found
//         return res.redirect('back');
//       }
  
//       if (user.password !== req.body.password) {
//         // Handle password mismatch
//         return res.redirect('back');
//       }
  
//       // Handle session creation(if password matches we set the cookie with user id )
//       res.cookie('user_id', user.id);
//       return res.redirect('/users/profile');
//     } catch (err) {
//       console.error('Error in finding user in signing in:', err);
//       return res.redirect('back');
//     }
//   };


// sign in and create a session for the user
module.exports.createSession = function(req, res){
  req.flash('success', 'Logged in Successfully');
  return res.redirect('/');
}

//signout 
module.exports.destroySession = function(req, res){
  req.logout(req.user, err => {
      if(err) return ;
      res.redirect("/");
    });
  req.flash('success', 'You have logged out!');


  return res.redirect('/');
}
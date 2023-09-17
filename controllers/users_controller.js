const User = require('../models/user');

module.exports.profile = async function(req, res){
  try{
      let user = await User.findById(req.cookies.user_id);
      console.log(user);
          return res.render('user_profile', {
              title: 'User Profile',
              user: req.user,
              profile_user:user
          });
        
  }catch(err){
      console.log("error in profile controller",err);
  }

}

// module.exports.profile = function(req,res){
//     return res.render('user_profile',{
//         title:"User Profile",
//       })
// }


//render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"Social | Sign Up",
    })
}

//render the sign in page
module.exports.signIn = function(req,res){
  return res.render('user_sign_in',{
      title:"Social | Sign In",
  })
}

//get the sign up data

module.exports.create = async (req, res) => {
    try {

       if (req.body.password != req.body.confirm_password) {
           return res.redirect("back");
       }
  
       var user = await User.findOne({ email: req.body.email });
              if (!user) {
              await User.create(req.body);
              } else {
              
                  console.log('User is already present !!')
              }
              console.log('success', 'You have Signed-Up Successfully !')
              return res.redirect("/users/sign-in");
  
    } catch (error) {
      console.log("Error", error);
    }
  };


// sign in and create a session for the user
module.exports.createSession = async function (req, res) {
  //steps to authenticate   
  try {
      const user = await User.findOne({ email: req.body.email }).exec();
  
      if (!user) {
        // Handle user not found
        return res.redirect('back');
      }
  
      if (user.password !== req.body.password) {
        // Handle password mismatch
        return res.redirect('back');
      }
  
      // Handle session creation(if password matches we set the cookie with user id )
      res.cookie('user_id', user.id);
      return res.redirect('/users/profile');
    } catch (err) {
      console.error('Error in finding user in signing in:', err);
      return res.redirect('back');
    }
  };
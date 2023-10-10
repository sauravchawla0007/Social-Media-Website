const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function (req, res) {
 
  try {
      let posts = await Post.find({})
      //to sorted order our post
          .sort('-createdAt')
          .populate('user')
          .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path:  'likes'
            }
        }).populate('likes');
        posts.forEach((post)=>{
            post.comments.forEach(async (comment)=>{
                comment.user = await User.findById(comment.user)
            })
        })
        let users = await User.find({});
        
      
      return res.render('home', {
          title: "Social | Home",
          posts: posts,
          all_users: users
         
      });
  } catch (err) {
      console.log('Error', err);
      return;
  }


}
// module.exports.home=function(req,res){
//   //controller will acess the view 
//   // console.log(req.cookies);
//   // res.cookie('user_id',25);
//   // return res.render('home',{//accessing the home.ejs file and rendering home.ejs
//   //   title:"Home",//this title varialble is in home.ejs file to put the value of "Home"
//   // })
//   // Post.find({}, function(err, posts){
//     //     return res.render('home', {
//     //         title: "Codeial | Home",
//     //         posts:  posts
//     //     });
//     // });

//     // populate the user of each post
    
// }
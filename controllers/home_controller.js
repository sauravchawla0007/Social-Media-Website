const Post = require('../models/post');

module.exports.home = async function (req, res) {
 
  try {
      let posts = await Post.find({})
      //to sorted order our post
          //.sort('-createdAt')
          .populate('user')
          .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
          .exec();
      
      return res.render('home', {
          title: "Social | Home",
          posts: posts,
         
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
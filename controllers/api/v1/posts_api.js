const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req, res){


    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();
            post.deleteOne();
            await Comment.deleteMany({post: req.params.id});


    
            return res.json(200, {
                message: "Post and associated comments deleted successfully!"
            });
        }else{
            return res.json(401, {
                message: "You cannot delete this post!"
            });
        }

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    
}
// module.exports.destroy = async function(req, res){

//     try{
//         const post = await Post.findById(req.params.id);
//         console.log('post',post);
//         // if (post.user == req.user.id){
//             //post.remove();
//             post.destroy().then(function(){

//                 res.status(200).json({
//                     message: 'User deleted.'
//                 })
        
//             });
//             await Comment.deleteMany({post: req.params.id});
   
//             // if(req.xhr){
//             //     return res.status(200).json({
//             //         data:{
//             //             post_id:req.params.id
//             //         },
//             //         message:"Post Deleted"
//             //     });
//             // }
    
//             // return res.json(200, {
//             //     message: "Post and associated comments deleted successfully!"
//             // });
//         // }else{
//         //     req.flash('error', 'You cannot delete this post!');
//         //     return res.redirect('back');
//         // }

//     }catch(err){
//         console.log('********', err);
//         return res.json(500, {
//             message: "Internal Server Error"
//         });
//     }
    
// }

// const Post = require("../../../models/post");
// const Comment = require("../../../models/comment");
// module.exports.index = async function (req, res) {
//   let posts = await Post.find({})
//     .sort("-createdAt")
//     .populate("user")
//     .populate({
//       path: "comments",
//       populate: {
//         path: "user",
//       },
//     });

//   return res.json(200, {
//     message: "List of posts",
//     posts: posts,
//   });
// };

// module.exports.destroy = async function (req, res) {
//   try {
//     let post = await Post.findById(req.params.id);

//     if (post.user == req.user.id) {
//       post.remove();

//       await Comment.deleteMany({ post: req.params.id });

//       return res.json(200, {
//         message: "Post and associated comments deleted successfully!",
//       });
//     } else {
//       return res.json(401, {
//         message: "You cannot delete this post!",
//       });
//     }
//   } catch (err) {
//     console.log("********", err);
//     return res.json(500, {
//       message: "Internal Server Error",
//     });
//   }
// };
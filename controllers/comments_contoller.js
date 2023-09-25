const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
 
    try {
        let post = await Post.findById(req.body.post);
        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        
    }
 } catch (err) {
        console.log('Error', err);
        return;
    }
  
  
  }

  
module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);
         let post = await Post.findById(comment.post);
        
        if (comment.user == req.user.id || req.user.id == post.user){
            let postId = comment.post;

            await comment.deleteOne();

            await Post.findByIdAndUpdate(postId, { $pull: {comments:{_id: req.params.id}}});

            //destroy the associated likes for this comment
            //await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            console.log('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            console.log('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        console.log('error', err);
        return;
    }
    
}
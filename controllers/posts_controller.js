const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        

        req.flash('success', 'Post Published')
        return res.redirect('back');
    } catch (err) {
        // console.log('Error', err);
        req.flash('error', err);
        // return;
        return res.redirect('back');
    }

}


module.exports.destroy = async function(req, res){
    console.log("comming to post");
        try{
            let post = await Post.findById(req.params.id);
    
            if (post.user == req.user.id){
    
                //deleted the associated likes for the post
                // await Like.deleteMany({likeable: post, onModel: 'Post'});
                // await Like.deleteMany({_id: {$in: post.comments}});
    
    
                await post.deleteOne();
                await Comment.deleteMany({post: req.params.id});
    
    
                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            post_id: req.params.id
                        },
                        message: "Post deleted"
                    });
                }
    
                req.flash('success', 'Post and associated comments deleted!');
    
                return res.redirect('back');
            }else{
                req.flash('error', 'You cannot delete this post!');
                return res.redirect('back');
            }
    
        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
        
    }
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        //to check it is a xmal HTTP Request
        if (req.xhr) {
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it! (To display the user's name with the post added dynamically)
            // post = await Post.populate('user', 'name').execPopulate();
            return res.status(200).json({
                data: {
                    post: post,
                },
                message: "post created !"
            });
        }

        console.log('success', 'Post Published')
        return res.redirect('back');
    } catch (err) {
        // console.log('Error', err);
        console.log('error', err);
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
    
                console.log('success', 'Post and associated comments deleted!');
    
                return res.redirect('back');
            }else{
                console.log('error', 'You cannot delete this post!');
                return res.redirect('back');
            }
    
        }catch(err){
            console.log('error', err);
            return res.redirect('back');
        }
        
    }
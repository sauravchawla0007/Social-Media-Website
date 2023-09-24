const Post = require('../models/post')

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
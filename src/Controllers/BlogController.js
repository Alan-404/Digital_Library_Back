const blogModel = require('../Models/BlogModel');
const accountModel = require('../Models/AccountModel');
const userModel = require('../Models/UserModel');
class BlogController {
    //insert blog
    async insertBlog(req, res){
        const accountId = req.accountId;
        const {title, thumnail, introduction, content} = req.body;
        try{
            const account = await accountModel.findById(accountId);
            if (!account)
                return res.json({success: false, message: 'Invalid account'});

            const newBlog = new blogModel({userId: account.userId, title, thumnail, introduction, content});

            await newBlog.save();

            return res.json({success: true, message: 'Insert blog successfully', blog: newBlog});
        }
        catch(error){
            return res.json({success: false, message: error.message})
        }
    }

    //get all Blog
    async getAll(req, res){
        var users = []
        try{
            const blogs = await blogModel.find({});
            for (let blog of blogs){
                const user = await userModel.findOne({_id: blog.userId});
                users.push(user.firstName + ' ' + user.middleName + ' ' + user.lastName);
            }
            return res.json({blogs, users});
        }
        catch(error){
            return res.json({message: error.message});
        }
    }


    //get blog by id
    async getBlogById(req, res){
        const {blogId} = req.query;
        try{
            const blog = await blogModel.findById(blogId);
            const user = await userModel.findById(blog.userId);
            var commenter = [];
            for (let comment of blog.comments){
                let accountComment = await accountModel.findById(comment.accountId);
                let userComment = await userModel.findById(accountComment.userId);
                const objUser = {avatar: userComment.avatar, name: userComment.firstName + ' ' + userComment.middleName + ' ' + userComment.lastName}
                commenter.push(objUser);
            }
            return res.json({success: true, blog, writer: user.firstName + ' ' + user.middleName + ' ' + user.lastName, commenter});
        }
        catch(error){
            return res.json({message: error.message});
        }   
    }


    //add comment in blog
    async addComment(req, res){
        const accountId = req.accountId;
        const {blogId, comment} = req.body;
        try{
            const blog = await blogModel.findById(blogId);
            var comments = blog.comments;
            const objComment = {accountId, comment};
            comments.push(objComment);

            await blogModel.findByIdAndUpdate(blogId, {comments});
            return res.json({success: true, message: 'Add comment success'});
        }
        catch(error){
            return res.json({success: false, message: error.message});
        }
    }

}

module.exports = new BlogController;
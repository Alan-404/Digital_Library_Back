const commentModel = require('../Models/CommentModel');
const accountModel = require('../Models/AccountModel');
const userModel = require('../Models/UserModel');

class CommentController {
    //insert
    async insertComment(req, res){
        const accountId = req.accountId;
        const {objId, content} = req.body;
        if (!objId || !content)
            return res.json({success: false, message: 'Missing information'});
        try{
            const checkAccount = await accountModel.findById(accountId);
            if (!checkAccount)
                return res.json({success: false, message: 'Invalid account'});

            const newComment = new commentModel({objId, accountId, content, reply:[]});

            await newComment.save();

            return res.json({success: true, message: 'Add comment success'});
        }
        catch(error){
            return res.json({success: false, message: error.message});
        }
    }

    async getAllCommentsByObjId(req, res){
        const {id} = req.query;
        var users = [];
        try{
            const comments = await commentModel.find({objId: id})
            for (let comment of comments){
                const account = await accountModel.findById(comment.accountId);
                const user = await userModel.findById(account.userId);
                users.push(user);
            }
            return res.json({comments, users});
        }
        catch(error){
            return res.json({message: error.message})
        }
    }


}

module.exports = new CommentController;
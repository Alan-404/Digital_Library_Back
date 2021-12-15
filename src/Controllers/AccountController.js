const accountModel = require('../Models/AccountModel');
const userModel = require('../Models/UserModel');
const argon2 = require('argon2')
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const UserController = require('./UserController');
const AccountModel = require('../Models/AccountModel');
const UserModel = require('../Models/UserModel');

class AccountController {
    //insert account get from user controller
    async insertAccount(username, password, userId, role){
        try{
            const checkUsername = await accountModel.findOne({username});
            if (checkUsername)
                return null;
            
            const hashPassword = await argon2.hash(password);
            const newAccount = new accountModel ({username, password: hashPassword, userId, role});

            await newAccount.save();

            const accessToken = jwt.sign(
                {accountId: newAccount._id},
                process.env.SECRET
            )
            return accessToken;
        }
        catch(error){
            console.log(error.message);
            return null;
        }
    }

    //login account
    async loginAccount(req, res){
        const {username, password} = req.body;
        if (!username || !password)
            return res.json({success: false, message: 'Missing information'});

        try{
            const account = await accountModel.findOne({username});
            const checkPassword = await argon2.verify(account.password, password);
            if (!checkPassword)
                return res.json({success: false, message: 'Invalid account'});

            const accessToken = jwt.sign(
                {accountId: account._id},
                process.env.SECRET
            )

            return res.json({success: true, message: 'Login account successfully', accessToken});

        }
        catch(error){
            return res.json({success: false, message: 'Invalid account'});
        }
    }

    //change password
    async changePassword(req, res){
        const {oldPassword, newPassword} = req.body;
        if (!newPassword || !oldPassword)
            return res.json({success: false, message: 'Missing information'});

        try{
            const account = await accountModel.findById(req.accountId);
            if (!account)
                return res.json({success: false, message: 'Invalid account'});
            
            const checkPassword = await argon2.verify(account.password, oldPassword);
            if (!checkPassword)
                return res.json({success: false, message: 'Invalid account'});

            const hashPassword = await argon2.hash(newPassword);

            await accountModel.findOneAndUpdate({_id: account._id}, {password: hashPassword});

            return res.json({success: true, message: 'Change password successfully'});
        }
        catch(error){
            return res.json({success: false, message: error.message});
        }
    }

    //change password when forgot

    //get infor user by access token
    async getNameUser(req, res){
        try{
            const account = await accountModel.findById(req.accountId);
            console.log()
            if (!account)
                return res.json({success: false, message: 'Not found account',name: undefined});

            const userId = account.userId;

            const user = await userModel.findById(userId);

            return res.json({success: true, message: 'Get username successfully' ,accountId: account._id,name: user.firstName + ' ' + user.middleName + ' ' + user.lastName, role: account.role});
        }
        catch(error){
            return res.json({success: false, message: error.message, name: undefined});
        }
    }

    //check role
    async checkRole(req, res){
        const accountId = req.accountId;
        try{
            const account = await accountModel.findById(accountId);
            return res.json({role: account.role});
        }
        catch(error){
            return res.json({message: error.message});
        }
    }


    async getInfoUser(req, res){
        const accountId = req.accountId;
        try{
            const account = await accountModel.findById(accountId);
            if (!account)
                return res.json({message: 'Invalid account'});
            const user = await userModel.findById(account.userId);
            return res.json({user, username: account.username});
        }
        catch(error){
            return res.json({message: error.message})
        }
    }

    async getAllUserByRole(req, res){
        var allAccountsAdmin = []
        var allUsersAdmin = []

        var allAccountsMember = []
        var allUsersMember = []


        try{
            allAccountsAdmin = await AccountModel.find({role: true});
            for (let ad of allAccountsAdmin){
                const userAdmin = await UserModel.findById(ad.userId);
                allUsersAdmin.push(userAdmin);
            }

            allAccountsMember = await AccountModel.find({role: false});
            for (let mem of allAccountsMember){
                const userMember = await UserModel.findById(mem.userId);
                allUsersMember.push(userMember);
            }
            
            return res.json({admins: allUsersAdmin, members: allUsersMember})
        }
        catch(error){
            return res.json({success: false, message: error.message})
        }
    }

    async resetPassword(req, res){
        const {newPassword, rePass} = req.body;
        if (newPassword != rePass)
            return res.json({success: false, message: 'Your password is not matched'})
        try{
            
        }
        catch(error){

        }
    }


    
}

module.exports = new AccountController;
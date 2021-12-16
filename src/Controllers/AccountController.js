const accountModel = require('../Models/AccountModel');
const userModel = require('../Models/UserModel');
const argon2 = require('argon2')
const jwt = require('jsonwebtoken');


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

            if (user.firstName == null)
                user.firstName = '';
            if (user.middleName == null)
                user.middleName = ''
            if (user.lastName == null)
                user.lastName = ''

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
            if (user.firstName == null)
                user.firstName = ''
            if (user.middleName == null)
                user.middleName = ''
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
            allAccountsAdmin = await accountModel.find({role: true});
            for (let ad of allAccountsAdmin){
                const userAdmin = await userModel.findById(ad.userId);
                if (userAdmin.firstName == null)
                    userAdmin.firstName = ''
                if (userAdmin.middleName == null)
                    userAdmin.middleName = ''
                allUsersAdmin.push(userAdmin);
            }

            allAccountsMember = await accountModel.find({role: false});
            for (let mem of allAccountsMember){
                var userMember = await userModel.findById(mem.userId);
                if (userMember.firstName == null)
                    userMember.firstName = ''
                if (userMember.middleName == null)
                    userMember.middleName = ''
                allUsersMember.push(userMember);
            }
            
            return res.json({admins: allUsersAdmin, members: allUsersMember})
        }
        catch(error){
            return res.json({success: false, message: error.message})
        }
    }

    async resetPassword(req, res){
        const {email, newPassword} = req.body;
        try{
            const user = await userModel.findOne({email})
            if (!user)
                return res.json({success: false})
            const hashPassword = await argon2.hash(newPassword)
            await accountModel.findOneAndUpdate({userId: user._id}, {password: hashPassword})

            return res.json({success: true})
        }
        catch(error){
            return res.json({success: false, message: error.message})
        }
    }


    
    async loginByFacebook(req, res){
        const {id} = req.body;

        try{
            const account = await accountModel.findOne({username:id})
            const accessToken = jwt.sign(
                {accountId: account._id},
                process.env.SECRET
            )
            if (!account)
                return res.json({success: false})
            return res.json({success: true, accessToken})
        }
        catch(error){
            console.log(error.message)
            return res.json({success: false})
        }
    }
    


    
}

module.exports = new AccountController;
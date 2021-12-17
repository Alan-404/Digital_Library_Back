const userModel = require('../Models/UserModel');
const AccountController = require('./AccountController');
var nodemailer = require('nodemailer');
const {myEmail, myPassword, templateResetPassword} = require('../Common/Constants');
const accountModel = require('../Models/AccountModel');
const UserModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
class UserController{
    //register user
    async registerUser(req, res){
        const {firstName, middleName, lastName, phone, email, bDate, username, password, role, avatar} = req.body;

        if (!firstName || !lastName || !username || !password)
            return res.json({success: false, message: 'Missing information'});
        
        if (email)
        {
            const checkEmailExist = await userModel.findOne({email});
            if (checkEmailExist)
              return res.json({success: false, message: 'Your email has been taken'});
        }
        try{
            const newUser = new userModel({firstName, middleName, lastName, phone, email, bDate, avatar});
            const accessToken = await AccountController.insertAccount(username, password, newUser._id, role);
            if (!accessToken)
              return res.json({success: false, message: 'Insert account fail'});

            await newUser.save();

            return res.json({success: true, message: 'Insert user successfully', accessToken, userId: newUser._id});
        }
        catch(error){
            return res.json({success: false, message: error.message});
        }
    }

    async sendMail(req, res){
        const {email} = req.body;
        const checkUserByEmail = await userModel.findOne({email});

        if (!checkUserByEmail)
            return res.json({success: false, message: 'Invalid email'});


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: myEmail,
              pass: myPassword
            }
          });

          var mailOptions = {
            from: myEmail,
            to:email,
            subject: 'Reset Password',
            html: templateResetPassword
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return res.json({success: false, messgae: error.message});
            } else {
              console.log('Email sent: ' + info.response);
              return res.json({success: true, message: 'Please check your email'});
            }
          });
    }

    async getAllUsers(req, res){
      const accountId = req.accountId;
      var role = [];
      try{
        const account = await accountModel.findById(accountId);
        if (!account.role)
          return res.json({message: "Access Denied"})
        const users = await userModel.find({});
        const accounts = await accountModel.find({});
        for (let account of accounts)
          role.push(account.role);
        return res.json({users, role});
      }
      catch(error){
        return res.json({message: error});
      }
    }

    async changeRole(req, res){
      const {id} = req.body;

      try{
        const user = await userModel.findById(id)
        const account = await accountModel.findOne({userId: user._id})
        const role = !account.role
        await accountModel.findByIdAndUpdate(account._id, {role})

        return res.json({success: true})
      }
      catch(error){
        console.log(error.message)
        return res.json({success: false})
      }
    }


    async deleteUser(req, res){
      const {id} = req.query;
      if (!id)
        return res.json({success: false})
      const accountId = req.accountId;

      try{
        const accountAdmin = await accountModel.findById(accountId)
        if (!accountAdmin.role)
          return res.json({success: false})
        await accountModel.findOneAndRemove({userId: id})
        await userModel.findByIdAndRemove(id);

        return res.json({success: true})
      }
      catch(error){
        return res.json({success: false, message: error.message})
      }
    }

    async registerByGoogle(req, res){
      const {id, fullName, email, imageUrl} = req.body;
      if (!id || !fullName || !email || !imageUrl)
        return res.json({success: false})

      try{
        const account = await accountModel.findOne({username: id})
        if (account)
          return res.json({success: false})
        const user  = await userModel.findOne({email})
        if (user)
          return res.json({success: false})
        const newUser = new UserModel({lastName: fullName, email, avatar: imageUrl})
        const accessToken = await AccountController.insertAccount(id, id, newUser._id, false);
        if (!accessToken)
          return res.json({success: false, message: 'Insert account fail'});
        await newUser.save();

        return res.json({success: true, message: 'Insert user successfully', accessToken, userId: newUser._id});
      }
      catch(error){
        console.log(error.message)
        return res.json({success: false})
      }
    }


    async loginByGoogle(req, res){
      const {email} = req.body;
      if (!email){
        return res.json({success: false})
      }

      try{
        const user = await userModel.findOne({email})
        if (!user)
          return res.json({success: false})
        const account = await accountModel.findOne({userId: user._id})
        const accessToken = jwt.sign(
          {accountId: account._id},
          process.env.SECRET
        )
        
        return res.json({success: true, accessToken})
      }
      catch(error){
        console.log(error.message)
        return res.json({success: false})
      }
    }


    async registerByFacebook(req, res){
      const {name, id, avatar} = req.body;

      try{
        const account = await accountModel.findOne({username: id})
        if (account)
          return res.json({success: false})
        const newUser = new UserModel({lastName: name, avatar})
        const accessToken = await AccountController.insertAccount(id, id, newUser._id, false);
        if (!accessToken)
          return res.json({success: false, message: 'Insert account fail'});
        await newUser.save();

        return res.json({success: true, message: 'Insert user successfully', accessToken, userId: newUser._id});

      }
      catch(error){
        console.log(error.message)
        return res.json({success: false})
      }
    }


    async editInfoUser(req, res){
      const {firstName, middleName, lastName, phone, bDate, maxim, id} = req.body;
      try{
        const user = await UserModel.findById(id)
        if (!user)
          return res.json({success: false})
        
        await userModel.findByIdAndUpdate(id, {firstName, middleName, lastName, phone, bDate, maxim})

        return res.json({success: true})
      }
      catch(error){
        console.log(error.message)
        return res.json({success: false})
      } 
    }


    async changeAvatar(req, res){
      const {id, avatar} = req.body

      try{
        const user = await userModel.findById(id)

        if (!user)
          return res.json({success: false})
        await userModel.findByIdAndUpdate(id, {avatar});

        return res.json({success: true})
      }
      catch(error){
        console.log(error.message)
        return res.json({success: false})
      }
    }

}

module.exports = new UserController;
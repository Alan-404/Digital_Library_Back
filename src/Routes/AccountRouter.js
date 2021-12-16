const express = require('express');
const router = express.Router();
const AccountController = require('../Controllers/AccountController');
const verifyToken = require('../Middleware/Auth');

router.post('/login', AccountController.loginAccount);
router.put('/change',verifyToken ,AccountController.changePassword);
router.get('/getInfor', verifyToken, AccountController.getNameUser);
router.get('/getRole', verifyToken, AccountController.checkRole);
router.get('/info', verifyToken, AccountController.getInfoUser);
router.put('/reset-password', AccountController.resetPassword);
router.post('/login-facebook', AccountController.loginByFacebook);
router.get('/getAllUsers', AccountController.getAllUserByRole)

module.exports = router;
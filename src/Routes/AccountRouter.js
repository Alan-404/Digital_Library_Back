const express = require('express');
const router = express.Router();
const AccountController = require('../Controllers/AccountController');
const verifyToken = require('../Middleware/Auth');

router.post('/login', AccountController.loginAccount);
router.post('/change',verifyToken ,AccountController.changePassword);
router.get('/getInfor', verifyToken, AccountController.getNameUser);
router.get('/getRole', verifyToken, AccountController.checkRole);
router.get('/info', verifyToken, AccountController.getInfoUser);
router.get('/getAllUsers', AccountController.getAllUserByRole)

module.exports = router;
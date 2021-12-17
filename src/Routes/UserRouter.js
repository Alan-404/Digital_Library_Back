const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const verifyToken = require('../Middleware/Auth')

router.post('/insert', UserController.registerUser);
router.post('/mail',UserController.sendMail);
router.put('/role', verifyToken, UserController.changeRole)
router.delete('/delete*',verifyToken, UserController.deleteUser);
router.post('/register-google', UserController.registerByGoogle)
router.post('/login-google', UserController.loginByGoogle)
router.put('/edit', UserController.editInfoUser);
router.put('/change-avatar', UserController.changeAvatar)
router.post('/register-facebook', UserController.registerByFacebook);
router.get('/', verifyToken,  UserController.getAllUsers);

module.exports = router;
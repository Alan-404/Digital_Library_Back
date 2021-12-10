const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const verifyToken = require('../Middleware/Auth')

router.post('/insert', UserController.registerUser);
router.post('/mail',UserController.sendMail);
router.put('/giveAdmin', UserController.giveAdmin);
router.delete('/delete/:id', UserController.deleteUser);
router.get('/', verifyToken,  UserController.getAllUsers);

module.exports = router;
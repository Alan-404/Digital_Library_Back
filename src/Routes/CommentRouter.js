const express = require('express');
const router = express.Router();
const CommentController = require('../Controllers/CommentController');
const verify = require('../Middleware/Auth');


router.post('/add',verify,CommentController.insertComment);
router.get('/all*', CommentController.getAllCommentsByObjId);

module.exports = router;


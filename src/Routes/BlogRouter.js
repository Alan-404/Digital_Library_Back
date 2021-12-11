const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/Auth')
const BlogController = require('../Controllers/BlogController');

router.post('/insert', verifyToken, BlogController.insertBlog);
router.get('/getBlog*', BlogController.getBlogById);
router.post('/addComment', verifyToken, BlogController.addComment);
router.get('/token', verifyToken, BlogController.getAllBlogsByToken);
router.get('/', BlogController.getAll);
module.exports = router;
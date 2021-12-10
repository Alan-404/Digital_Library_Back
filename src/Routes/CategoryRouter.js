const express = require('express');
const router = express.Router();
const CategoryController = require('../Controllers/CategoryController');

router.post('/insert', CategoryController.insertCategory);
router.get('/',CategoryController.getAllCategories)

module.exports = router;
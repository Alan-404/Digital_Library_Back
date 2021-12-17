const express = require('express');
const router = express.Router();
const CategoryController = require('../Controllers/CategoryController');

router.post('/insert', CategoryController.insertCategory);
router.delete('/delete*', CategoryController.deleteCategory);
router.put('/edit-info', CategoryController.editInfor);
router.put('/change-image', CategoryController.changeImage)
router.get('/',CategoryController.getAllCategories)

module.exports = router;
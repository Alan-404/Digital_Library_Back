const express = require('express');
const router = express.Router();
const NewsController = require('../Controllers/NewsController');

router.post('/insert', NewsController.insertNews);
router.get('/getNewsById?*', NewsController.getNewsById);
router.delete('/delete*', NewsController.deleteNews)
router.get('/', NewsController.getAllNews);

module.exports = router;
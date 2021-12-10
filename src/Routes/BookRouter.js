const express = require('express');
const router = express.Router();
const BookController = require('../Controllers/BookController');


router.post('/insert', BookController.insertBook);
router.get('/allInfoCategories',BookController.getAllInfo);
router.get('/getBooksAuthor?*', BookController.getBooksByAuthorId);
router.get('/getBooks?*',BookController.getBookByCategoryId);
router.get('/infoBook?*', BookController.getInfoOfBook);
router.get('/getAll', BookController.getAllBooks);



module.exports = router;
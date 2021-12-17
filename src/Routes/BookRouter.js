const express = require('express');
const router = express.Router();
const BookController = require('../Controllers/BookController');


router.post('/insert', BookController.insertBook);
router.get('/allInfoCategories',BookController.getAllInfo);
router.get('/getBooksAuthor?*', BookController.getBooksByAuthorId);
router.get('/getBooks?*',BookController.getBookByCategoryId);
router.get('/infoBook?*', BookController.getInfoOfBook);
router.get('/show-all', BookController.showAll)
router.put('/change-image', BookController.changeImage);
router.put('/edit-info', BookController.editInfo)
router.delete('/delete*', BookController.deleteBook)
router.get('/getAll', BookController.getAllBooks);



module.exports = router;
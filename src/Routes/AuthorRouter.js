const express = require('express');
const router = express.Router();
const AuthorController = require('../Controllers/AuthorController');

router.post('/insert', AuthorController.insertAuthor);
router.get('/getAuthor/:authorId', AuthorController.getAuthorById);
router.delete('/delete/:authorId', AuthorController.deleteAuthor);
router.get('/', AuthorController.getAllAuthors);

module.exports = router;
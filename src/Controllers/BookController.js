const bookModel = require('../Models/BookModel');
const AuthorController = require('./AuthorController');
const CategoryController = require('./CategoryController');
const categoryModel = require('../Models/CategoryModel');
const authorModel = require('../Models/AuthorModel');
class BookController {
    //insert book
    async insertBook(req, res){
        const {name, imageLink, linkPdf, category, author, description} = req.body;

        if (!name || !linkPdf)
            return res.json({success: false, message: 'Missing information'});

        try{
            const authorId = await AuthorController.findAuthor(author);

            if (!authorId)
                return res.json({success: false, messgae: 'Invalid author'});

            const categoryId = await CategoryController.findIdCategoryByName(category);

            if (!categoryId)
                return res.json({success: false, messgae: 'Invalid category'});
            
            const newBook = new bookModel({name, authorId, imageLink, linkPdf,description, categoryId});

            await newBook.save();

            return res.json({success: true, message: 'Insert book successfully'});
            

        }
        catch(error){
            return res.json({success: false, message: error.message});
        }
    }

    async getBookByCategoryName(req, res){
        const {categoryName} = req.query;
        var books = [];
        try{
            const category = await categoryModel.findOne({name: categoryName});
            books = await bookModel.find({categoryId: category._id});

            return res.json({success: true, message: 'Get all books', books});
        }
        catch(error){
            return res.json({success: false, message: error.message});
        }
    }

    async getInfoOfBook(req, res){
        const {id} = req.query;
        try{
            const book = await bookModel.findById(id);
            const author = await authorModel.findById(book.authorId);
            const category = await categoryModel.findById(book.categoryId);
            return res.json({success: true, message: 'Get book', book, authorName: author.name, categoryName: category.name});
        }   
        catch(error){
            return res.json({success: false, message: error});
        }
    }

    async getBookByCategoryId(req, res){
        const {categoryId} = req.query;
        var books = [];
        var category;
        var authorName = [];
        try{
            category = await categoryModel.findById(categoryId);
            books = await bookModel.find({categoryId});
            for (let book of books){
                var author = await authorModel.findOne({_id: book.authorId});
                authorName.push(author.name);
            }
            return res.json({category ,books, authorName});
        }
        catch(error){
            return res.json({success: false, message: error.message})
        }
    }


    async getAllInfo(req, res){
        var categories = [];
        var info = {category: {}, books};
        var allInfo = [];
        try{
            categories = await categoryModel.find({});

            for (var i=0; i<categories.length; i++)
            {
                var books = await bookModel.find({categoryId: categories[i]._id});
                info.category = categories[i];
                info.books = books;

                allInfo.push(info);
                info = {category: {}, books};
            }


            return res.json({allInfo});
        }
        catch(error){
            return res.json({success: false, message: error.message})
        }
    }

    async getBooksByAuthorId(req, res){
        const {authorId} = req.query;
        var books = [];
        try{
            books = await bookModel.find({authorId});
            return res.json({books});
        }
        catch(error){
            return res.json({message: error.message})
        }
    }
    

    async getAllBooks(req, res){
        try{
            const books = await bookModel.find({});

            return res.json({books});
        }
        catch(error){   
            return res.json({message: error.message})
        }
    }
}

module.exports = new BookController;
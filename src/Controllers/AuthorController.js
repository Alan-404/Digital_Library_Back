const authorModel = require('../Models/AuthorModel');

class AuthorController {
    //insert
    async insertAuthor(req, res){
        const {name, description, imageLink} = req.body;

        if (!name)
            return res.json({success: false, message:'Missing information'});
        
        try{
            const checkAuthor = await authorModel.findOne({name})

            if (checkAuthor)
                return res.json({success: false, message:'Author has been existed'});

            const newAuthor = new authorModel({name, description, imageLink});
            newAuthor.save();

            return res.json({success: true, message: 'Insert author successfully'});
            
        }
        catch(error){
            return res.json({success: false, message:error.message});
        }
    }

    async findAuthor(name){
        try{
            const author = await authorModel.findOne({name});

            if (!author)
                return null;
            return author._id;
        }
        catch(error){
            return null;
        }
    }


    //get all authors
    async getAllAuthors(req, res){
        try{
            const authors = await authorModel.find({});
            return res.json({authors});
        }
        catch(error){
            return res.json({message: error.message})
        }
    }

    async getAuthorById(req, res){
        const {authorId} =req.params;
        try{
            const author = await authorModel.findById(authorId);
            if (!author)
                return res.json({success: false});
            return res.json({success: true, author});
        }
        catch(error){
            return res.json({messgae: error.message})
        }
    }

    //delete author
    async deleteAuthor(req, res){
        const {authorId} =req.params;
        if (!authorId)
            return res.json({success: false, message: 'Missing id author'})
        try{
            await authorModel.findByIdAndDelete(authorId);
            return res.json({success: true, message: 'Delete author successfully'});
        }
        catch(error){
            return res.json({success: false, message: error.message})
        }
    }
}

module.exports = new AuthorController;
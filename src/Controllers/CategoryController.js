const categoryModel = require('../Models/CategoryModel');


class CategoryController{
    //insert category
    async insertCategory(req, res){
        const {name, description, imageLink} = req.body;

        if (!name)
            return res.json({success: false, message:'Missing information'});

        try{
            const checkName = await categoryModel.findOne({name});

            if (checkName)
                return res.json({success: false, message:'Category has been existed'});
            
            const newCategory = new categoryModel({name, imageLink, description});

            await newCategory.save();

            return res.json({success: true, message:'Insert category successfully'});
        }
        catch(error){
            return res.json({success: false, message:error.message});
        }
    }

    async findIdCategoryByName(name){
        try{
            const category = await categoryModel.findOne({name});
            if (!category)
                return null;
            return category._id;
        }
        catch(error){
            return null
        }
    }

    //get all categories
    async getAllCategories(req, res){
        var categories = [];
        try{
            categories = await categoryModel.find({});
            return res.json({success: true, categories});
        }
        catch(error){
            return res.json({success: false, message: error.message})
        }
    }


    //
    
}

module.exports = new CategoryController;
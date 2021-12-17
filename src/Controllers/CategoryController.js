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

    async deleteCategory(req, res){
        const {id} = req.query;
        if (!id)    
            return res.json({success: false})
        try{
            await categoryModel.findByIdAndDelete(id)

            return res.json({success: true})
        }
        catch(error){
            console.log(error.message)
            return res.json({success: false})
        }
    }

    async editInfor(req, res){
        const {id, name, description} = req.body;

        try{
            const category = await categoryModel.findById(id)
            if (!category)
                return res.json({success: false})
            await categoryModel.findByIdAndUpdate(id, {name, description});

            return res.json({success: true})
        }
        catch(error){
            console.log(error.message)
            return res.json({success: false})
        }
    }


    async changeImage(req, res){
        const {id, imageLink}=  req.body

        try{
            const category = await categoryModel.findById(id)
            if(!category)
                return res.json({success: false})

            await categoryModel.findByIdAndUpdate(id, {imageLink})

            return res.json({success: true})
        }
        catch(error){
            console.log(error.message)
            return res.json({success: false})
        }
    }
    
}

module.exports = new CategoryController;
const newsModel = require('../Models/NewsModel');


class NewsController{
    //insert news
    async insertNews(req, res){
        const {title, thumnail, content, introduction} = req.body;
        if (!title || !thumnail || !content || !introduction)
            return res.json({success: false, message: 'Missing information'});
        const comments = [];
        try{
            const news = new newsModel({title, thumnail,introduction, content, comments});
            await news.save();

            return res.json({success: true, message: 'Insert news successfully'})
        }
        catch(error){
            return res.json({success: false, message: error.message});
        }
    }

    ///get all news
    async getAllNews(req, res){
        try{
            const news = await newsModel.find({});
            return res.json({news});
        }
        catch (error){
            return res.json({message: error.message});
        }
    }

    //get news by id
    async getNewsById(req, res){
        
        const {newsId} = req.query;
        console.log(req.query)
        try{
            const news = await newsModel.findById(newsId);

            return res.json({news});
        }
        catch(error){
            return res.json({message: error.message})
        }
    }

    async deleteNews(req, res){
        const {id} = req.query;

        try{
            const news = await newsModel.findById(id)
            if (!news)
                return res.json({success: false})
            await newsModel.findByIdAndDelete(id)

            return res.json({success: true})
        }
        catch(error){
            console.log(error.message)
            return res.json({success: false})
        }
    }
}

module.exports = new NewsController;
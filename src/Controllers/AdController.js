const adModel = require('../Models/AdModel');

class AdController {
    //insert
    async insertAd(req, res){
        const {imageLink} = req.body;

        if (!imageLink)
            return res.json({success: false, message: 'Missing information'});

        try{
            const newAd = new adModel({imageLink});

            newAd.save();

            return res.json({success: true, message: 'Insert ad successfully'});
        }
        catch(error){
            return res.json({success: true, message: error.message});
        }
    }

    //get all ads
    async getAllAd(req, res){
        var ads = [];
        try{
            ads = await adModel.find({});

            return res.json({success: true, message: 'Get all ads', ads});
        }
        catch(error){
            return res.json({success: false, message: error.message});
        }
    }
}

module.exports = new AdController;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumnail: {
        type: String
    },
    introduction:{
        type: String
    },
    content:{
        type: String, 
        required: true
    },
    comments: {
        type: Array
    }
})

module.exports = mongoose.model('blogs', BlogSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    thumnail: {
        type: String
    },
    introduction: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: {
        type: Array
    }
})

module.exports = mongoose.model('news', NewsSchema);
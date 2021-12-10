const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    authorId:{
        type: Schema.Types.ObjectId,
        ref: 'authors',
        required: true
    },
    imageLink: {
        type: String,
        required: true
    },
    linkPdf: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    }
})

module.exports = mongoose.model('books', BookSchema);
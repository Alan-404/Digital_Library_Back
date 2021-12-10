const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    objId: {
        type: Schema.Types.ObjectId,
        href: 'authors',
        href: 'blogs',
        href: 'news',
        href: 'books'
    },
    accountId: {
        type: Schema.Types.ObjectId,
        href :'accounts'
    },
    content: {
        type: String,
        required: true
    },
    reply: {
        type: []
    }
})

module.exports = mongoose.model('comments', CommentSchema)
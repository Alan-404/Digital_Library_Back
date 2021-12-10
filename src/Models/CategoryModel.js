const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategotySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imageLink: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('categories', CategotySchema);
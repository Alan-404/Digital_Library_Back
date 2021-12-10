const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AdSchema = new Schema({
    imageLink: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('ads', AdSchema);
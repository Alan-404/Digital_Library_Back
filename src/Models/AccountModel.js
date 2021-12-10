const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccountSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    role: {
        type: Boolean
    }
})


module.exports = mongoose.model('accounts', AccountSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName: {
        type: String
    },
    middleName:{
        type: String
    },
    lastName: {
        type: String
    },
    phone:{
        type: String
    },
    email: {
        type: String
    },
    bDate: {
        type: Date
    },
    avatar: {
        type: String
    },
    maxim:{
        type: String
    }
})


module.exports = mongoose.model('users', UserSchema);
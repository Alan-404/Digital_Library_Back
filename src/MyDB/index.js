const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.DB}`);
        console.log('Connected to database');
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {connectDB};
const mongoose = require('mongoose')
const dotenv = require('dotenv');

const connectDB= async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://euro:123@cluster0.gnlfp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            {
               useUnifiedTopology:true,
               useNewUrlParser:true,
               autoIndex:true,

            });
            console.log("connected");
    } catch (error) {

        console.error("error");
        process.exit();
        
    }
};

module.exports = connectDB;
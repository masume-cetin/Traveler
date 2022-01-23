const mongoose = require('mongoose');

const connectDB=async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true,
        })
        console.log(`mongodb bağlandı: ${conn}`);
    }catch(error){
        console.error(`error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB
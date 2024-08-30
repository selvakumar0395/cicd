const mongoose = require('mongoose');

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log('database connected succesfully');
    } catch (error) {
        console.log(`database connection error:`, error);
    }
}

module.exports=dbConnect;
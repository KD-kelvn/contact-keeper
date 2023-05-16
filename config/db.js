const mongoose =  require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

 const connectDB = async ()=> {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected successfully");
    }
    catch(error){
        console.error(error.message);
        // throw error;
    }
 }
 mongoose.connection.on("disconnected", ()=> {
    console.log("disconnected");
});

mongoose.connection.on("connected", ()=> {
    console.log("connected to mongodb");
});

module.exports = connectDB
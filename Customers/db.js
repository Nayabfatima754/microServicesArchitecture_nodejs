const mongoose = require('mongoose')
require('dotenv').config()

const mongoUrl = process.env.MONGODB_URL_LOCAL || process.env.MONGODB_URL;

const connectDB=async()=>{
    try{
        mongoose.connect(mongoUrl, {
            useNewUrlParser: true,      // Ensure the new URL parser is used
            useUnifiedTopology: true    // Enable the new Server Discover and Monitoring engine
          })
          console.log('MongoDB connected');

    }
   catch(err){
    console.error('Database connection failed:', error);
    process.exit(1); // Exit process with failure
   }
}
  
  module.exports = connectDB;
  
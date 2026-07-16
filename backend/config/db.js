const mongoose = require('mongoose');

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI;
  const fallbackUri = 'mongodb://127.0.0.1:27017/imdev';
  
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout before fallback
    });
    console.log(`MongoDB Connected (Atlas): ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Atlas Connection Failed: ${error.message}`);
    console.log('Falling back to local MongoDB database...');
    try {
      const conn = await mongoose.connect(fallbackUri);
      console.log(`MongoDB Connected (Local Fallback): ${conn.connection.host}`);
    } catch (fallbackError) {
      console.error(`Local MongoDB Connection Failed: ${fallbackError.message}`);
      console.error('Please make sure you have a local MongoDB database running or verify your Atlas connection.');
      // Do not crash the server so other parts of backend development can continue
    }
  }
};

module.exports = connectDB;

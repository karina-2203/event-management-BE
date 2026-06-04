const mongoose = require('mongoose');
const logger = require('../../loggers/logger');
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectDB;
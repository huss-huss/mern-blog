const mongoose = require('mongoose');

const databaseUrl = process.env.MONGO_URI
const dbConnect = () => {
    
    mongoose.connect(databaseUrl)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

};

module.exports = dbConnect;
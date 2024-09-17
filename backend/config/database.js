const mongoose = require('mongoose');


const connectedToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/course', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

module.exports = { connectedToDatabase }


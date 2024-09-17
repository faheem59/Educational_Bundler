const app = require("./app")
const { config } = require("dotenv")
const database = require('./config/database');
const cloudinary = require('cloudinary').v2;

database.connectedToDatabase();

config({
    path: './config/config.env'
})

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});



app.listen(process.env.PORT, () => {
    console.log(`Server is Running at ${process.env.PORT}`);
})

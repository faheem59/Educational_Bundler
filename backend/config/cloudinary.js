// config/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dkunixcth',
    api_key: '359751492735481',
    api_secret: 'QvDpHsXmXyNRaKb6Ar9ePQncOf4',
});

module.exports = cloudinary;

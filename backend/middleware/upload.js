const multer = require("multer");

const storage = multer.memoryStorage();

const videoUpload = multer({ storage }).single("video");


module.exports = videoUpload;
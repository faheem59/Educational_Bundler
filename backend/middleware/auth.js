const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];


    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);


    next();
});

exports.authorizAdmin = (req, res, next) => {
    if (req.user.role !== 'admin')
        return next(
            new ErrorHandler(`${req.user.role} is not allowed to access this resource`, 403)
        );

    next();
}
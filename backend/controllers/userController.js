const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const ErrorHandler = require("../utils/errorHandler");
const { sendEmail } = require('../utils/sendEmail');
const { sendToken } = require('../utils/sendToken');
const Course = require("../models/courseModel");
const getDataUri = require('../utils/dataUri');
const cloudinary = require("cloudinary").v2;

exports.createUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return next(new ErrorHandler("Please Enter All fields", 400));

    const file = req.file;
    if (!file) return next(new ErrorHandler("No file uploaded", 400));

    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.uploader.upload(fileUri.content);

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already exists", 409));

    user = new User({
        email,
        password,
        name,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    });

    await user.save();
    sendToken(res, user, "Registered Successfully");
});


exports.login = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) return next(new ErrorHandler("Please Enter All fields", 400))

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));
    const isMatch = await user.comparePassword(password);

    if (!isMatch) return next(new ErrorHandler("Invalid Credential", 401));

    sendToken(res, user, `Welcome Back ${user.name} `, 200)

});


exports.logout = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Logout Successfully"
    })
})


exports.getMyProfile = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })
})



// update User password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }



    user.password = req.body.newPassword;

    await user.save();
    res.status(200).json({
        success: true,
        message: "Password Changed Successfully"
    })

});


//update Profile 
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    await user.save();
    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully"
    });
});

exports.updateProfilePicture = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    const file = req.file;
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.uploader.upload(fileUri.content);
    await cloudinary.uploader.destroy(user.avatar.public_id);

    user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
    }
    await user.save();
    res.status(200).json({
        success: true,
        message: "Profile Picture Updated Successfully"
    });
});


// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Course Bundler Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(200).json({
        success: true,
        message: "Reset Password Successfully"
    });

});


exports.addToPlayList = (catchAsyncError(async (req, res, next) => {
    // Ensur
    const userId = req.user && req.user._id;

    if (!userId) {
        return next(new ErrorHandler("User not authenticated", 401));
    }

    const user = await User.findById(userId);


    const courseId = req.body.id;
    const course = await Course.findById(courseId);

    if (!course) {
        return next(new ErrorHandler("Invalid Course Id", 404));
    }

    const itemExist = user.playlist.find((item) => {
        if (item.course.toString() === course._id.toString()) return true;
    })

    if (itemExist) return next(new ErrorHandler("Item Already Exits", 409));

    // Fix the typo: change playlsit to playlist
    user.playlist.push({
        course: course._id,
        poster: course.poster.url,
    });

    console.log(user);

    await user.save();

    res.status(200).json({
        success: true,
        message: "Added To Playlist"
    });

}));

exports.removeFromPlayList = (catchAsyncError(async (req, res, next) => {
    // Ensur
    const userId = req.user && req.user._id;

    if (!userId) {
        return next(new ErrorHandler("User not authenticated", 401));
    }

    const user = await User.findById(userId);


    const courseId = req.query.id;
    const course = await Course.findById(courseId);

    if (!course) {
        return next(new ErrorHandler("Invalid Course Id", 404));
    }

    const newPlaylist = user.playlist.find((item) => {
        if (item.course.toString() !== course._id.toString()) return item;
    })

    user.playlist = newPlaylist;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Remove From Playlist"
    });

}));


// Admin controllers

exports.getAllUsers = catchAsyncError(async (req, res, next) => {

    const users = await User.find({})
    res.status(200).json({
        success: true,
        users
    })
})

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorHandler("User Not found", 404));

    user.role = user.role === "user" ? "admin" : "user";


    await user.save();

    res.status(200).json({
        success: true,
        message: "Role Updated Successfully",
    });
});


exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorHandler("User Not found", 404));

    await cloudinary.uploader.destroy(user.avatar.public_id);

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});

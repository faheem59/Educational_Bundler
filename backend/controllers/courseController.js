const catchAsyncError = require("../middleware/catchAsyncError");
const Course = require("../models/courseModel");
const User = require('../models/userModel')
const getDataUri = require("../utils/dataUri");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary").v2;

exports.createCourse = catchAsyncError(async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;
    if (!title || !description || !category || !createdBy)
        return next(new ErrorHandler("Please Add all Field", 404));

    const file = req.file;

    const fileUri = getDataUri(file);


    const myCloud = await cloudinary.uploader.upload(fileUri.content);

    await Course.create({
        title,
        description,
        category,
        createdBy,
        poster: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    })
    res.status(201).json({
        success: true,
        message: "Course Created Successfully. You can add Lecture Now",
    });

});

exports.getAllCourse = catchAsyncError(async (req, res, next) => {
    const courses = await Course.find()
        .populate({
            path: 'createdBy',

        })
        .select('-lectures');
    res.status(200).json({
        success: true,
        courses,
    });
});


exports.getCourseLectures = catchAsyncError(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) return next(new ErrorHandler("Course not found", 404));

    course.views += 1;
    await course.save();
    res.status(200).json({
        success: true,
        lectures: course.lectures,
    });
});


exports.addLecture = catchAsyncError(async (req, res, next) => {
    const { title, description } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) return next(new ErrorHandler("Course not found", 404));

    const file = req.file;
    if (!file) return next(new ErrorHandler("No file uploaded", 400));

    try {
        const fileUri = getDataUri(file);


        const myCloud = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: 'video',
        });


        course.lectures.push({
            title,
            description,
            video: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        });

        course.numOfVideos = course.lectures.length;
        await course.save();

        res.status(200).json({
            success: true,
            message: "Lecture Added Successfully in Course"
        });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return next(new ErrorHandler("Error uploading video", 500));
    }
});


// delete course
exports.deleteCourse = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) return next(new ErrorHandler("Course not found", 404));

    await cloudinary.uploader.destroy(course.poster.public_id);

    for (let i = 0; i < course.lectures.length; i++) {
        const singleLecture = course.lectures[i];
        await cloudinary.uploader.destroy(singleLecture.video.public_id);
    }


    await course.deleteOne();

    res.status(201).json({
        success: true,
        message: "Course deleted Successfully.",
    });

});



exports.deleteLecture = catchAsyncError(async (req, res, next) => {
    const { courseId, lectureId } = req.query;

    const course = await Course.findById(courseId);

    if (!course) return next(new ErrorHandler("Course not found", 404));

    // Find the lecture with the specified ID
    const lecture = course.lectures.find(item => item._id.toString() === lectureId.toString());

    if (!lecture) {
        return next(new ErrorHandler("Lecture not found", 404));
    }

    // Check if lecture.video is defined before accessing its properties
    if (lecture.video && lecture.video.public_id) {
        await cloudinary.uploader.destroy(lecture.video.public_id, {
            resource_type: 'video',
        });

    }

    // Filter out the deleted lecture
    course.lectures = course.lectures.filter(item => item._id.toString() !== lectureId.toString());
    course.numOfVideos = course.lectures.length;
    await course.save();

    res.status(201).json({
        success: true,
        message: "Lecture deleted Successfully.",
    });
});

exports.getDashboardData = catchAsyncError(async (req, res, next) => {
    const userId = req.user.id;

    // Fetch the user with their playlist
    const user = await User.findById(userId)
        .select('name email playlist')
        .populate({
            path: 'playlist.course',
            select: 'title description category createdBy lectures',
            populate: {
                path: 'createdBy',
                select: 'name poster'
            }
        });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Extract courses from the playlist
    const courses = user.playlist.map(item => item.course);

    const totalCourses = courses.length;
    const totalLectures = courses.reduce((acc, course) => acc + course.lectures.length, 0);


    res.status(200).json({
        success: true,
        data: {
            user: {
                name: user.name,
                email: user.email
            },
            totalCourses,
            totalLectures,
            courses
        }
    });
});

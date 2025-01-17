const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter course title"],
        minLength: [4, "Title must be at least 4 characters"],
        maxLength: [80, " Title can't exceed 80 characters"],
    },
    description: {
        type: String,
        required: [true, "Please enter course title"],
        minLength: [20, "Title must be at least 20 characters"],

    },
    lectures: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },

            video: {
                public_id: {
                    type: String,

                },
                url: {
                    type: String,

                },

            },
        }
    ],
    poster: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },

    },
    views: {
        type: Number,
        default: 0,

    },
    numOfVideos: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: true,

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: [true, "Enter Course Creator"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const CourseModel = mongoose.model("Course", courseSchema);

module.exports = CourseModel;

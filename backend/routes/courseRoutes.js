const express = require('express');
const { getAllCourse, createCourse, getCourseLectures, addLecture, deleteCourse, deleteLecture, getDashboardData } = require('../controllers/courseController');
const singleUpload = require('../middleware/multer');
const { authorizAdmin, isAuthenticatedUser } = require('../middleware/auth');
const videoUpload = require('../middleware/upload');

const router = express.Router();
router.route('/createcourse').post(isAuthenticatedUser, authorizAdmin, singleUpload, createCourse);
router.route('/course').get(getAllCourse);

router.route('/course/:id').get(isAuthenticatedUser, getCourseLectures).post(isAuthenticatedUser, authorizAdmin, videoUpload, addLecture).delete(isAuthenticatedUser, authorizAdmin, deleteCourse);
router.route("/lecture").delete(isAuthenticatedUser, authorizAdmin, deleteLecture);
router.get('/dashboard', isAuthenticatedUser, getDashboardData);
module.exports = router
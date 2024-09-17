const express = require('express');
const { createUser, login, logout, getMyProfile, updatePassword, updateProfile, updateProfilePicture, forgotPassword, resetPassword, addToPlayList, removeFromPlayList, getAllUsers, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizAdmin } = require('../middleware/auth');
const singleUpload = require('../middleware/multer');
const router = express.Router();

router.route('/createuser').post(singleUpload, createUser);

router.route('/login').post(login);
router.route('/logout').get(logout);

router.route('/me').get(isAuthenticatedUser, getMyProfile);

router.route('/updatepassword').put(isAuthenticatedUser, updatePassword);

router.route('/updateprofile').put(isAuthenticatedUser, updateProfile);

router.route('/updateprofilepicture').put(singleUpload, isAuthenticatedUser, updateProfilePicture);

router.route('/forgetpassword').post(forgotPassword);

router.route('/resetpassword').put(resetPassword);

router.route('/addtoplaylist').post(isAuthenticatedUser, addToPlayList);

router.route('/removefromplaylist').delete(isAuthenticatedUser, removeFromPlayList);


// Admin routes

router.route('/admin/users').get(isAuthenticatedUser, authorizAdmin, getAllUsers)
router.route('/admin/user/:id').put(isAuthenticatedUser, authorizAdmin, updateUserRole).delete(isAuthenticatedUser, authorizAdmin, deleteUser);

module.exports = router;
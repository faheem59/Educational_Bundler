const express = require('express');
const {
  getAllInstructors,
  createInstructor,
  getInstructorById,
  deleteInstructor
} = require('../controllers/instructorController');

const router = express.Router();

router.get('/instructors', getAllInstructors);
router.post('/createinstructor', createInstructor);
router.get('/instructor/:id', getInstructorById);
router.delete('/:id', deleteInstructor);

module.exports = router;

const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  courses: {
    type: [String],
    required: true,
  },
});

const Instructor = mongoose.model('Instructor', InstructorSchema);

module.exports = Instructor;

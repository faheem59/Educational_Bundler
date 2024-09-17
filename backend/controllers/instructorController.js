const Instructor = require('../models/InstructorModel');

// Get all instructors
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new instructor
exports.createInstructor = async (req, res) => {
  const { name, bio, expertise, imageSrc, courses } = req.body;

  try {
    const newInstructor = new Instructor({
      name,
      bio,
      expertise,
      imageSrc,
      courses,
    });

    const instructor = await newInstructor.save();
    res.status(201).json(instructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get instructor by ID
exports.getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.status(200).json(instructor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an instructor
exports.deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    await instructor.remove();
    res.status(200).json({ message: 'Instructor removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

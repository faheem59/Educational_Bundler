const Enrollment = require('../models/enrollmentModel');


exports.createEnrollment = async (req, res) => {
    try {
        const newEnrollment = new Enrollment(req.body);
        await newEnrollment.save();
        console.log("sfs", newEnrollment)
        res.status(201).json({ message: 'Enrollment created successfully', enrollment: newEnrollment });
    } catch (error) {
        res.status(400).json({ message: 'Error creating enrollment', error });
    }
};


exports.getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find();
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching enrollments', error });
    }
};


exports.getEnrollmentById = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching enrollment', error });
    }
};

exports.updateEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        res.status(200).json({ message: 'Enrollment updated successfully', enrollment });
    } catch (error) {
        res.status(400).json({ message: 'Error updating enrollment', error });
    }
};


exports.deleteEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        res.status(200).json({ message: 'Enrollment deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting enrollment', error });
    }
};

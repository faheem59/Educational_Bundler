const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema({
    personalInfo: {
        fullName: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: true
        },
        nationality: {
            type: String,
            required: true
        },

        phoneNumber: {
            type: String,
            required: true
        },
        emailAddress: {
            type: String,
            required: true
        }
    },
    parentGuardianInfo: {
        fullName: {
            type: String,
            required: true
        },
        relationship: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        emailAddress: {
            type: String,
            required: true
        }
    },
    emergencyContact: {
        fullName: {
            type: String,
            required: true
        },
        relationship: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        }
    },
    previousEducation: {
        schoolName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        gradeCompleted: {
            type: String,
            required: true
        },
        yearsAttended: {
            type: String,
            required: true
        }
    },
    enrollmentDetails: {
        programGrade: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        preferredSchedule: {
            type: String,
            enum: ['Morning', 'Afternoon', 'Evening'],
            required: true
        }
    },
    medicalInfo: {
        allergies: {
            type: String
        },
        medications: {
            type: String
        },

    },
    additionalInfo: {
        specialNeeds: {
            type: String
        },
        extracurricularInterests: {
            type: String
        }
    },
    consent: {
        dataConsent: {
            type: Boolean,
            required: true
        },
        policyAgreement: {
            type: Boolean,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);

module.exports = Enrollment;

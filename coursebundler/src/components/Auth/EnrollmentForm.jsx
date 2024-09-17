import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Textarea, Select, useToast, Checkbox, Heading } from '@chakra-ui/react';

const EnrollmentForm = () => {
    const [formData, setFormData] = useState({
        personalInfo: {
            fullName: '',
            dateOfBirth: '',
            gender: '',
            nationality: '',
            phoneNumber: '',
            emailAddress: ''
        },
        parentGuardianInfo: {
            fullName: '',
            relationship: '',
            phoneNumber: '',
            emailAddress: ''
        },
        emergencyContact: {
            fullName: '',
            relationship: '',
            phoneNumber: ''
        },
        previousEducation: {
            schoolName: '',
            address: '',
            gradeCompleted: '',
            yearsAttended: ''
        },
        enrollmentDetails: {
            programGrade: '',
            startDate: '',
            preferredSchedule: ''
        },
        medicalInfo: {
            allergies: '',
            medications: ''
        },
        additionalInfo: {
            specialNeeds: '',
            extracurricularInterests: ''
        },
        consent: {
            dataConsent: false,
            policyAgreement: false
        }
    });

    const toast = useToast();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                consent: {
                    ...prev.consent,
                    [name]: checked
                }
            }));
        } else {
            const nameParts = name.split('.');
            if (nameParts.length > 1) {
                const [section, subKey] = nameParts;
                setFormData(prev => ({
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [subKey]: value
                    }
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form Data:', formData);

        try {
            const response = await fetch('http://localhost:4000/api/v1/enrollments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                toast({
                    title: 'Enrollment created.',
                    description: result.message,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                setFormData({
                    personalInfo: { fullName: '', dateOfBirth: '', gender: '', nationality: '', phoneNumber: '', emailAddress: '' },
                    parentGuardianInfo: { fullName: '', relationship: '', phoneNumber: '', emailAddress: '' },
                    emergencyContact: { fullName: '', relationship: '', phoneNumber: '' },
                    previousEducation: { schoolName: '', address: '', gradeCompleted: '', yearsAttended: '' },
                    enrollmentDetails: { programGrade: '', startDate: '', preferredSchedule: '' },
                    medicalInfo: { allergies: '', medications: '' },
                    additionalInfo: { specialNeeds: '', extracurricularInterests: '' },
                    consent: { dataConsent: false, policyAgreement: false }
                });
            } else {
                const error = await response.json();
                console.error('Server Error:', error);
                toast({
                    title: 'Error.',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Unexpected Error:', error);
            toast({
                title: 'Error.',
                description: 'An unexpected error occurred.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Box width="80%" maxW="800px" mx="auto" p={4}>
            <Heading>Enrollment Form</Heading>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <Box>
                        <FormControl isRequired>
                            <FormLabel>Full Name</FormLabel>
                            <Input
                                name="personalInfo.fullName"
                                value={formData.personalInfo.fullName}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Date of Birth</FormLabel>
                            <Input
                                type="date"
                                name="personalInfo.dateOfBirth"
                                value={formData.personalInfo.dateOfBirth}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Gender</FormLabel>
                            <Select
                                name="personalInfo.gender"
                                value={formData.personalInfo.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Nationality</FormLabel>
                            <Input
                                name="personalInfo.nationality"
                                value={formData.personalInfo.nationality}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Phone Number</FormLabel>
                            <Input
                                name="personalInfo.phoneNumber"
                                value={formData.personalInfo.phoneNumber}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                type="email"
                                name="personalInfo.emailAddress"
                                value={formData.personalInfo.emailAddress}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                    {/* Parent/Guardian Info */}
                    <Box>
                        <FormControl isRequired>
                            <FormLabel>Parent/Guardian Full Name</FormLabel>
                            <Input
                                name="parentGuardianInfo.fullName"
                                value={formData.parentGuardianInfo.fullName}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Relationship</FormLabel>
                            <Input
                                name="parentGuardianInfo.relationship"
                                value={formData.parentGuardianInfo.relationship}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Phone Number</FormLabel>
                            <Input
                                name="parentGuardianInfo.phoneNumber"
                                value={formData.parentGuardianInfo.phoneNumber}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                type="email"
                                name="parentGuardianInfo.emailAddress"
                                value={formData.parentGuardianInfo.emailAddress}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                    {/* Emergency Contact */}
                    <Box>
                        <FormControl isRequired>
                            <FormLabel>Emergency Contact Full Name</FormLabel>
                            <Input
                                name="emergencyContact.fullName"
                                value={formData.emergencyContact.fullName}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Relationship</FormLabel>
                            <Input
                                name="emergencyContact.relationship"
                                value={formData.emergencyContact.relationship}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Phone Number</FormLabel>
                            <Input
                                name="emergencyContact.phoneNumber"
                                value={formData.emergencyContact.phoneNumber}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                    {/* Previous Education */}
                    <Box>
                        <FormControl>
                            <FormLabel>Previous School Name</FormLabel>
                            <Input
                                name="previousEducation.schoolName"
                                value={formData.previousEducation.schoolName}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input
                                name="previousEducation.address"
                                value={formData.previousEducation.address}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Grade Completed</FormLabel>
                            <Input
                                name="previousEducation.gradeCompleted"
                                value={formData.previousEducation.gradeCompleted}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Years Attended</FormLabel>
                            <Input
                                name="previousEducation.yearsAttended"
                                value={formData.previousEducation.yearsAttended}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                    {/* Enrollment Details */}
                    <Box>
                        <FormControl isRequired>
                            <FormLabel>Program Grade</FormLabel>
                            <Input
                                name="enrollmentDetails.programGrade"
                                value={formData.enrollmentDetails.programGrade}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Start Date</FormLabel>
                            <Input
                                type="date"
                                name="enrollmentDetails.startDate"
                                value={formData.enrollmentDetails.startDate}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Preferred Schedule</FormLabel>
                            <Input
                                name="enrollmentDetails.preferredSchedule"
                                value={formData.enrollmentDetails.preferredSchedule}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                    {/* Medical Info */}
                    <Box>
                        <FormControl>
                            <FormLabel>Allergies</FormLabel>
                            <Textarea
                                name="medicalInfo.allergies"
                                value={formData.medicalInfo.allergies}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Medications</FormLabel>
                            <Textarea
                                name="medicalInfo.medications"
                                value={formData.medicalInfo.medications}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                    {/* Additional Info */}
                    <Box>
                        <FormControl>
                            <FormLabel>Special Needs</FormLabel>
                            <Textarea
                                name="additionalInfo.specialNeeds"
                                value={formData.additionalInfo.specialNeeds}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Extracurricular Interests</FormLabel>
                            <Textarea
                                name="additionalInfo.extracurricularInterests"
                                value={formData.additionalInfo.extracurricularInterests}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                    {/* Consent */}
                    <Box>
                        <FormControl isRequired>
                            <Checkbox
                                name="dataConsent"
                                isChecked={formData.consent.dataConsent}
                                onChange={handleChange}
                            >
                                I consent to data collection
                            </Checkbox>
                        </FormControl>
                        <FormControl isRequired>
                            <Checkbox
                                name="policyAgreement"
                                isChecked={formData.consent.policyAgreement}
                                onChange={handleChange}
                            >
                                I agree to the policy
                            </Checkbox>
                        </FormControl>
                    </Box>

                    <Button type="submit" colorScheme="blue">Submit</Button>
                </Stack>
            </form>
        </Box>
    );
};

export default EnrollmentForm;

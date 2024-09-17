import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Avatar, Text, Stack, Container, Heading } from '@chakra-ui/react';

const InstructorProfiles = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/v1/instructors');
        setInstructors(data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Instructor Profiles</Heading>
      <Stack spacing={6}>
        {instructors.map(instructor => (
          <Box
            key={instructor._id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            bg="white"
          >
            <Stack direction="row" spacing={4} align="center">
              <Avatar name={instructor.name} src={instructor.imageSrc} />
              <Stack spacing={1}>
                <Text fontWeight="bold" color={'black'} fontSize="xl">{instructor.name}</Text>
                <Text color="gray.600">{instructor.bio}</Text>
                <Text color="teal.500">{instructor.expertise}</Text>
                <Text color="blue.500">Courses: {instructor.courses.join(', ')}</Text>
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default InstructorProfiles;

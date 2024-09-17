import React, { useState, useEffect } from 'react';
import { Avatar, Box, Container, Heading, Stack, Text, useToast, Divider, VStack, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InstructorProfile = () => {
    const { id } = useParams();
    const [instructor, setInstructor] = useState(null);
    const toast = useToast();

    useEffect(() => {
        const fetchInstructor = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/api/v1/instructor/${id}`);
                setInstructor(data);
            } catch (error) {
                toast({
                    title: "Error fetching instructor.",
                    description: error.response?.data?.message || "An error occurred while fetching instructor details.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        fetchInstructor();
    }, [id, toast]);

    if (!instructor) {
        return <Text>Loading...</Text>;
    }

    return (
        <Container maxW="container.md" py={16}>
            <VStack spacing={6} align="center">
                <Box
                    borderWidth={1}
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    p={4}
                    bg="white"
                    w="full"
                >
                    <Avatar
                        name={instructor.name}
                        src={instructor.imageSrc}
                        size="xl"
                        mb={4}
                    />
                    <Heading as="h1" size="lg" mb={2} textAlign="center">
                        {instructor.name}
                    </Heading>
                    <Text fontSize="md" color="gray.600" textAlign="center">
                        {instructor.bio}
                    </Text>
                    <Divider my={4} />
                    <Stack spacing={3} align="center">
                        <Text fontSize="md" fontWeight="bold" color="teal.500">
                            Expertise
                        </Text>
                        <Text fontSize="md" textAlign="center">
                            {instructor.expertise}
                        </Text>
                        <Divider />
                        <Text fontSize="md" fontWeight="bold" color="teal.500">
                            Courses
                        </Text>
                        <Text fontSize="md" textAlign="center">
                            {instructor.courses}
                        </Text>
                    </Stack>
                </Box>
                <Button
                    colorScheme="teal"
                    variant="solid"
                    size="lg"
                    mt={6}
                    onClick={() => alert("Follow Instructor")}
                >
                    Follow Instructor
                </Button>
            </VStack>
        </Container>
    );
};

export default InstructorProfile;

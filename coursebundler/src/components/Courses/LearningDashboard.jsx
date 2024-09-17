import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Container,
    Heading,
    Text,
    List,
    ListItem,
    SimpleGrid,
    Avatar,
    Spinner,
    Center,
    Progress,
    Stack,
    Collapse,
    Button,
    useDisclosure,
    Flex,
    useColorMode,
    Image,
} from '@chakra-ui/react';

const LearningDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const { isOpen, onToggle } = useDisclosure();
    const { colorMode } = useColorMode();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/v1/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(data, "skfk");
                setDashboardData(data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, [token]);

    if (!dashboardData) return (
        <Center height="100vh">
            <Spinner size="xl" />
        </Center>
    );

    const { user, totalCourses, totalLectures, courses } = dashboardData.data;

    const calculateProgress = (course) => {
        const completedLectures = course.completedLectures || 0;
        return (completedLectures / course.lectures.length) * 100;
    };

    return (
        <Container maxW="container.lg" py={6}>
            <Stack spacing={8}>
                <Box
                    position="relative"
                    top={0}
                    p={6}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="md"
                    bg={colorMode === 'light' ? 'white' : 'gray.800'}
                    color={colorMode === 'light' ? 'black' : 'white'}
                    zIndex={1}
                >
                    <Heading as="h1" size="2xl" textAlign="center">Learning Dashboard</Heading>
                    <Text fontSize="xl" mt={2} textAlign="center">Welcome, {user.name}!</Text>
                    <Avatar name={user.name} mt={4} size="xl" display="block" mx="auto" />
                    <Box mt={6} textAlign="center">
                        <Text fontSize="lg"><strong>Email:</strong> {user.email}</Text>
                        <Text fontSize="lg"><strong>Total Courses:</strong> {totalCourses}</Text>
                        <Text fontSize="lg"><strong>Total Lectures:</strong> {totalLectures}</Text>
                    </Box>
                </Box>

                {/* Courses Container */}
                <Box>
                    <Heading as="h2" size="lg" mb={4}>Your Courses</Heading>
                    <List spacing={4}>
                        {courses.map(course => (
                            <ListItem
                                key={course._id}
                                p={4}
                                shadow="md"
                                borderWidth="1px"
                                borderRadius="md"
                                bg={colorMode === 'light' ? 'gray.50' : 'gray.700'}
                                color={colorMode === 'light' ? 'black' : 'white'}
                                _hover={{ bg: colorMode === 'light' ? 'gray.100' : 'gray.600' }}
                            >
                                <Flex direction="column" align="flex-start">
                                    <Heading as="h3" size="md">{course.title}</Heading>
                                    <Text mt={2}>{course.description}</Text>
                                    <Text mt={2}><strong>Category:</strong> {course.category}</Text>
                                    <Text mt={2}><strong>Created By:</strong> {course.createdBy.name}</Text>
                                    <Box mt={4}>
                                        <Text><strong>Progress:</strong></Text>
                                        <Progress
                                            value={calculateProgress(course)}
                                            colorScheme="yellow"
                                            size="sm"
                                        />
                                    </Box>
                                    <Button
                                        mt={4}
                                        onClick={onToggle}
                                        colorScheme="teal"
                                    >
                                        {isOpen ? 'Hide Lectures' : 'Show Lectures'}
                                    </Button>
                                    <Collapse in={isOpen}>
                                        <Box mt={4} p={4} borderWidth="1px" borderRadius="md" bg={colorMode === 'light' ? 'white' : 'gray.800'}>
                                            <Heading as="h4" size="sm" mb={2}>Lectures</Heading>
                                            <List spacing={2}>
                                                {course.lectures.map(lecture => (
                                                    <ListItem
                                                        key={lecture._id}
                                                        p={2}
                                                        borderWidth="1px"
                                                        borderRadius="md"
                                                        bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
                                                        color={colorMode === 'light' ? 'black' : 'white'}
                                                    >
                                                        <Flex direction="column" align="flex-start">
                                                            <Text fontWeight="bold">{lecture.title}</Text>
                                                            <Box mt={2} w="full">
                                                                <video
                                                                    width="100%"
                                                                    controls
                                                                    src={lecture.video.url}
                                                                    style={{ borderRadius: '8px' }}
                                                                >
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            </Box>
                                                        </Flex>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Box>
                                    </Collapse>
                                </Flex>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Stack>
        </Container>
    );
};

export default LearningDashboard;

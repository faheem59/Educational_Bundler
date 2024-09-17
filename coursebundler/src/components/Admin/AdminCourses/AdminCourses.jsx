import { Box, Button, Grid, HStack, Heading, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';
import axios from 'axios';

const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    // Fetch all courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/v1/course', {
                    withCredentials: true,
                });
                console.log(data.courses);
                setCourses(data.courses);
            } catch (error) {
                console.error(error.response.data.message);
            }
        };

        fetchCourses();
    }, []);

    const courseDetailsHandler = (courseId) => {
        setSelectedCourseId(courseId)
        console.log("sfkjskjfkj", courseId);
        onOpen();
    };

    const deleteButtonHandler = (courseId) => {
        console.log(courseId);
    };

    const deleteLectureButtonHandler = (courseId, lectureId) => {
        console.log(courseId);
        console.log(lectureId);
    };

    const addLectureHandler = (e, courseId, title, description, video) => {
        e.preventDefault();
    };

    return (
        <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
            <Box p={['0', '8']} overflowX={'auto'}>
                <Heading textTransform={'uppercase'} my={16} textAlign={['center', 'left']}>
                    All Courses
                </Heading>
                <TableContainer w={['100vw', 'full']}>
                    <Table variant={'simple'} size={'lg'}>
                        <TableCaption>All available courses in the database</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Poster</Th>
                                <Th>Title</Th>
                                <Th>Category</Th>
                                <Th>Creator</Th>
                                <Th isNumeric>Views</Th>
                                <Th isNumeric>Lectures</Th>
                                <Th isNumeric>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {courses.map(item => (
                                <Row
                                    key={item._id}
                                    item={item}
                                    courseDetailsHandler={courseDetailsHandler}
                                    deleteButtonHandler={deleteButtonHandler}
                                />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>

                <CourseModal
                    isOpen={isOpen}
                    onClose={onClose}
                    id={selectedCourseId}
                    deleteButtonHandler={deleteLectureButtonHandler}
                    addLectureHandler={addLectureHandler}
                    courseTitle={'App course'}
                />
            </Box>
            <Sidebar />
        </Grid>
    );
};

export default AdminCourses;

function Row({ item, courseDetailsHandler, deleteButtonHandler }) {
    return (
        <Tr>
            <Td>#{item._id || 'N/A'}</Td>
            <Td><Image src={item.poster?.url || 'default-image-url.jpg'} boxSize='50px' objectFit='cover' /></Td>
            <Td>{item.title || 'No Title'}</Td>
            <Td textTransform={'uppercase'}>{item.category || 'No Category'}</Td>
            <Td>{item.createdBy?.name || 'Unknown Creator'}</Td>
            <Td isNumeric>{item.views || 0}</Td>
            <Td isNumeric>{item.numOfVideos || 0}</Td>
            <Td isNumeric>
                <HStack justifyContent={'flex-end'}>
                    <Button
                        onClick={() => courseDetailsHandler(item._id)}
                        variant={'outline'} color={'purple.500'}>
                        View Lectures
                    </Button>
                    <Button
                        onClick={() => deleteButtonHandler(item._id)}
                        color={'purple.600'}>
                        <RiDeleteBin7Fill />
                    </Button>
                </HStack>
            </Td>
        </Tr>
    );
}

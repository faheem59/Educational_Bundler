import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Grid,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCss } from '../../Auth/Register';

const CourseModal = ({ isOpen, onClose, id, courseTitle, addLectureHandler }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);
    const [videoPrev, setVideoPrev] = useState('');
    const [lectures, setLectures] = useState([]);
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        if (isOpen && id) {
            const fetchLectures = async () => {
                try {
                    const response = await axios.get(`http://localhost:4000/api/v1/course/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    setLectures(response.data.lectures);
                } catch (error) {
                    console.error('Error fetching lectures:', error);
                }
            };
            fetchLectures();
        }
    }, [isOpen, id, token]);


    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setVideoPrev(reader.result);
            setVideo(file);
        };
        reader.readAsDataURL(file);
    };

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setVideo(null);
        setVideoPrev('');
        onClose();
    };

    const handleAddLecture = async (e) => {
        e.preventDefault();

        if (!title || !description || !video) {
            alert('All fields are required');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video', video);

        try {
            await axios.post(`http://localhost:4000/api/v1/course/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token} `
                },
            });
            alert('Lecture added successfully');
            handleClose();
        } catch (error) {
            console.error('Error adding lecture:', error);
            alert('Failed to add lecture');
        }
    };
    const deleteButtonHandler = async (courseId, lectureId) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/course/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setLectures(prevLectures => prevLectures.filter(lecture => lecture._id !== lectureId));
            alert('Lecture deleted successfully');
        } catch (error) {
            console.error('Error deleting lecture:', error);
            alert('Failed to delete lecture');
        }
    };

    return (
        <Modal isOpen={isOpen} size={'full'} onClose={handleClose} scrollBehavior='outside'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{courseTitle}</ModalHeader>
                <ModalCloseButton />
                <ModalBody p='16'>
                    <Grid templateColumns={['1fr', '3fr 1fr']}>
                        <Box px={['0', '16']} >
                            <Box my={'5'}>
                                <Heading>{courseTitle}</Heading>
                                <Heading size={'sm'} opacity={'0.4'}>{`#${id}`}</Heading>
                            </Box>
                            <Heading size={'lg'}>Lectures</Heading>

                            {lectures.map((item, i) => (
                                <VideoCard
                                    key={i}
                                    title={item.title}
                                    description={item.description}
                                    num={i + 1}
                                    lectureId={item._id}
                                    courseId={id}
                                    deleteButtonHandler={deleteButtonHandler}
                                />
                            ))}
                        </Box>
                        <Box>
                            <form onSubmit={handleAddLecture}>
                                <VStack spacing={'4'}>
                                    <Heading size={'md'} textTransform={'uppercase'}>Add Lecture</Heading>
                                    <Input
                                        focusBorderColor='purple.300'
                                        placeholder='Title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <Input
                                        focusBorderColor='purple.300'
                                        placeholder='Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <Input
                                        accept='video/mp4'
                                        css={{
                                            '&::file-selector-button': {
                                                ...fileUploadCss,
                                                color: 'purple',
                                            }
                                        }}
                                        type='file'
                                        focusBorderColor='purple.300'
                                        onChange={handleVideoChange}
                                        required
                                    />
                                    {videoPrev && (
                                        <video controlsList='nodownload' controls src={videoPrev}></video>
                                    )}
                                    <Button w={'full'} colorScheme='purple' type='submit'>Upload</Button>
                                </VStack>
                            </form>
                        </Box>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

const VideoCard = ({ title, description, num, lectureId, courseId, deleteButtonHandler }) => (
    <Stack
        direction={['column', 'row']}
        my={'8'}
        borderRadius={'lg'}
        boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
        justifyContent={['flex-start', 'space-between']}
        p={['4', '8']}
    >
        <Box>
            <Heading size={'sm'}>{`#${num} ${title}`}</Heading>
            <Text>{description}</Text>
        </Box>
        <Button color={'purple.600'} onClick={() => deleteButtonHandler(courseId, lectureId)}>
            <RiDeleteBin7Fill />
        </Button>
    </Stack>
);

export default CourseModal;
